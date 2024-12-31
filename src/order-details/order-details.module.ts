import { Module } from '@nestjs/common';
import { OrderDetailController } from './order-details.controller';
import { OrderDetailService } from './order-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  exports: [OrderDetailService],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailsModule {}
