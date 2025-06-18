import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';
import { AmazonModule } from './amazon/amazon.module';
import { TimerModule } from './timer/timer.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ProductsModule,
    AmazonModule,
    TimerModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
