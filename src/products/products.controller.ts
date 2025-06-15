import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('new-category')
  async createCategory(@Body('name') name: string): Promise<string> {
    return await this.productsService.createCategory(name);
  }

  @Patch('update-category/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<string> {
    return await this.productsService.updateCategory(+id, name);
  }
  @Delete('delete-category/:id')
  async deleteCategory(@Param('id') id: string): Promise<string> {
    return await this.productsService.deleteCategory(+id);
  }

  @Get('categories')
  async getCategories(): Promise<any[]> {
    return await this.productsService.getCategories();
  }

  @Get('category/:id')
  async getCategoryById(@Param('id') id: string): Promise<any> {
    return await this.productsService.getCategoryById(+id);
  }
}
