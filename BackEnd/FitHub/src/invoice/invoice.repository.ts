import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { LessThan, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoiceRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async createInvoice(invoiceData: Partial<Invoice>): Promise<Invoice> {
    const invoice = this.invoiceRepository.create(invoiceData);
    return this.invoiceRepository.save(invoice);
  }

  async findInvoicesInThreeDays() {
    const now = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(now.getDate() + 3);

    return this.invoiceRepository.find({
      where: { dueDate: LessThan(threeDaysLater) },
      relations: ['user', 'plan'],
    });
  }
}
