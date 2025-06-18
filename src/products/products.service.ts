/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCategories(): Promise<any[]> {
    const cacheKey = 'categories:all';
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) return cached as any[];

    const categories = await this.prisma.category.findMany();
    await this.cacheManager.set(cacheKey, categories, 10 * 60 * 60 * 1000); // 10 часов

    return categories;
  }

  async getAllProducts(): Promise<any[]> {
    const cacheKey = 'products:all';
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) return cached as any[];

    const products = await this.prisma.product.findMany();
    await this.cacheManager.set(cacheKey, products, 10 * 60 * 60 * 1000); // 10 часов

    return products;
  }

  async getProductsByCategoryId(id: number): Promise<any[]> {
    const cacheKey = `products:category:${id}`;
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) return cached as any[];

    const products = await this.prisma.product.findMany({
      where: { categoryId: id },
    });

    await this.cacheManager.set(cacheKey, products, 10 * 60 * 60 * 1000); // 10 часов

    return products;
  }

  // При обновлении категорий/продуктов сбрасывай кэш:
  async createCategory(name: string, nodeId: string): Promise<any> {
    const result = await this.prisma.category.create({
      data: { name, nodeId },
    });
    await this.cacheManager.del('categories:all');
    return result;
  }

  async updateCategory(id: number, name: string): Promise<any> {
    const result = await this.prisma.category.update({
      where: { id },
      data: { name },
    });
    await this.cacheManager.del('categories:all');
    return result;
  }

  async deleteCategory(id: number): Promise<any> {
    const result = await this.prisma.category.delete({
      where: { id },
    });
    await this.cacheManager.del('categories:all');
    return result;
  }
}
