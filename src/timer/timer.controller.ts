import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimerService } from './timer.service';
import { CreateTimerDto } from './dto/create-timer.dto';
import { UpdateTimerDto } from './dto/update-timer.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('timer')
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  // i need function that will call function every 12 hours
  @Cron(CronExpression.EVERY_12_HOURS) // Every 12 hours
  handleCron() {
    this.timerService.callPaapiForAllCategories();
  }
}

// function that will gat all categories , find  it from amazon , and will add info to db
