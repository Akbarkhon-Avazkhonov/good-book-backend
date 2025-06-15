import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';
import { AmazonModule } from './amazon/amazon.module';

@Module({
  imports: [ProductsModule, AmazonModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
