import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async createCategory(name: string, nodeId: string): Promise<any> {
    // Here should be logic to create a category
    return await this.prisma.category.create({
      data: { name, nodeId }, // Assuming nodeId is optional and can be null
    });
  }

  async createCategories(categories: { name: string; nodeId: string }[]) {
    // Here should be logic to create multiple categories
    return await this.prisma.category.createMany({
      data: categories,
    });
  }

  async updateCategory(id: number, name: string, nodeId: string): Promise<any> {
    return await this.prisma.category.update({
      where: { id },
      data: { name },
    });
  }

  async deleteCategory(id: number): Promise<any> {
    // Here should be logic to delete a category
    return await this.prisma.category.delete({
      where: { id },
    });
  }

  async getCategories(): Promise<any[]> {
    // Here should be logic to get all categories
    return await this.prisma.category.findMany();
  }

  async getCategoryById(id: number): Promise<any> {
    // Here should be logic to get a category by ID
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async getProducts(): Promise<any[]> {
    // Here should be logic to get all products
    return await this.prisma.product.findMany();
  }
  async getProductById(id: number): Promise<any> {
    // Here should be logic to get a product by ID
    return await this.prisma.product.findUnique({
      where: { id },
    });
  }
  async getAllProducts(): Promise<any[]> {
    // Here should be logic to get all products
    return await this.prisma.product.findMany();
  }

  async getProductsByCategoryId(id: number): Promise<any[]> {
    // Here should be logic to get all products in a category by ID
    return await this.prisma.product.findMany({
      where: { categoryId: id },
    });
  }
}
