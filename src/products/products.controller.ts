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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('new-category')
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Books' },
        nodeId: { type: 'string', example: '123456' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Category created' })
  async createCategory(
    @Body('name') name: string,
    @Body('nodeId') nodeId: string,
  ): Promise<string> {
    return await this.productsService.createCategory(name, nodeId);
  }

  // @Post('new-categories')
  // @ApiOperation({ summary: 'Create multiple categories' })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       categories: {
  //         type: 'array',
  //         items: {
  //           type: 'object',
  //           properties: {
  //             name: { type: 'string', example: 'Electronics' },
  //             nodeId: { type: 'string', example: '987654' },
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({ status: 201, description: 'Categories created' })
  // async createCategories(
  //   @Body('categories') categories: { name: string; nodeId: string }[],
  // ) {
  //   return await this.productsService.createCategories(categories);
  // }

  @Patch('update-category/:id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({ name: 'id', type: 'string', example: '1' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Updated Books' },
        nodeId: { type: 'string', example: '654321' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Category updated' })
  async updateCategory(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<string> {
    return await this.productsService.updateCategory(+id, name);
  }

  @Delete('delete-category/:id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', type: 'string', example: '1' })
  @ApiResponse({ status: 200, description: 'Category deleted' })
  async deleteCategory(@Param('id') id: string): Promise<string> {
    return await this.productsService.deleteCategory(+id);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'List of categories' })
  async getCategories(): Promise<any[]> {
    return await this.productsService.getCategories();
  }

  // @Get('category/:id')
  // @ApiOperation({ summary: 'Get a single category by ID' })
  // @ApiParam({ name: 'id', type: 'string', example: '1' })
  // @ApiResponse({ status: 200, description: 'Category found' })
  // async getCategoryById(@Param('id') id: string): Promise<any> {
  //   return await this.productsService.getCategoryById(+id);
  // }

  @Get('all-products')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products' })
  async getAllProducts(): Promise<any[]> {
    return await this.productsService.getAllProducts();
  }

  // @Get('product/:id')
  // @ApiOperation({ summary: 'Get a single product by ID' })
  // @ApiParam({ name: 'id', type: 'string', example: '1' })
  // @ApiResponse({ status: 200, description: 'Product found' })
  // async getProductById(@Param('id') id: string): Promise<any> {
  //   return await this.productsService.getProductById(+id);
  // }

  @Get('categories-products/:id')
  @ApiOperation({ summary: 'Get all products in a category by ID' })
  @ApiParam({ name: 'id', type: 'string', example: '1' })
  @ApiResponse({ status: 200, description: 'List of products in category' })
  async getProductsByCategoryId(@Param('id') id: string): Promise<any[]> {
    return await this.productsService.getProductsByCategoryId(+id);
  }
}
