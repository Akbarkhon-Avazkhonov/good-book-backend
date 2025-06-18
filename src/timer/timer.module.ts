import { Module } from '@nestjs/common';
import { TimerService } from './timer.service';
import { TimerController } from './timer.controller';
import { PrismaService } from 'src/prisma.service';
import { AmazonService } from 'src/amazon/amazon.service';

@Module({
  controllers: [TimerController],
  providers: [TimerService, PrismaService, AmazonService],
})
export class TimerModule {}
