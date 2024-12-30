import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly PaymentRepository: Repository<Payment>,
  ) {}

  async CreateNewPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const createPayment = this.PaymentRepository.create(createPaymentDto);
    return this.PaymentRepository.save(createPayment);
  }

  async GetAllPayment(): Promise<Payment[]> {
    return this.PaymentRepository.find();
  }

  async GetPaymentById(paymentId: number): Promise<Payment> {
    return this.PaymentRepository.findOneBy({ paymentId });
  }

  async GetPaymentByKeyWord(searchParams: Partial<Payment>): Promise<Payment> {
    return this.PaymentRepository.findOneBy({
      ...searchParams,
    });
  }

  async UpdatePaymentById(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<void> {
    await this.PaymentRepository.update(id, updatePaymentDto);
  }

  async DeleteNewPaymentById(id: number): Promise<void> {
    await this.PaymentRepository.delete(id);
  }
}
