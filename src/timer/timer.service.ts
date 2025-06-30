/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { AmazonService } from 'src/amazon/amazon.service';
import { pars } from './pars';

@Injectable()
export class TimerService {
  constructor(
    private prisma: PrismaService,
    private amazonService: AmazonService,
  ) {}

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getAllCategories() {
    return await this.prisma.category.findMany();
  }

  async getCategoryById(id: number) {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async callPaapiForCategory(nodeId: string, id: number) {
    const items = await this.amazonService.searchItems(nodeId);
    console.warn(`Получены товары для категории ${nodeId}:`, items);
    if (!items.data.SearchResult || !items.data.SearchResult.Items) {
      // Удаляем категорию, если нет товаров
      await this.prisma.category.delete({
        where: { id: id },
      });
      return { success: false, message: 'No items found for this category' };
    }

    for (const item of items.data.SearchResult.Items) {
      try {
        const existingItem = await this.prisma.product.findUnique({
          where: { ASIN: item.ASIN },
        });
        console.warn(`Проверка товара ${item.ASIN}:`, existingItem);

        if (existingItem) continue;

        await this.prisma.product.create({
          data: {
            ASIN: item.ASIN,
            name: item.ItemInfo?.Title?.DisplayValue ?? 'Без названия',
            infoFromApi: JSON.stringify(item),
            categoryId: id,
          },
        });

        // вызвать функцию для парсинга товара
        // НЕ блокируем основной поток — парсим в фоне
        pars(JSON.stringify(item))
          .then((parsedData) => {
            return this.prisma.product.update({
              where: { ASIN: item.ASIN },
              data: {
                info: JSON.stringify({
                  ...parsedData,
                  DetailPageURL: item.DetailPageURL,
                }),
              },
            });
          })
          .catch((err) => {
            console.error(`Ошибка при парсинге ${item.ASIN}:`, err.message);
          });
      } catch (err) {
        console.error(`Ошибка при обработке товара ${item.ASIN}:`, err.message);
      }
    }

    return { success: true, items };
  }

  async callPaapiForAllCategories() {
    const categories = await this.getAllCategories();
    if (!categories || categories.length === 0) {
      throw new Error('No categories found');
    }

    for (const category of categories) {
      try {
        await this.delay(1100); // 1.1 секунда задержки между запросами
        console.log(`Обработка категории: ${category.nodeId}`);
        await this.callPaapiForCategory(category.nodeId, category.id);
      } catch (error) {
        console.error(
          `Ошибка при обработке категории ${category.nodeId}:`,
          error,
        );
      }
    }

    return { success: true, message: 'Обработаны все категории' };
  }
}
