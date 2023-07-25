import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { WarehouseTransactio } from './entities/transaction.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionsService {
  async create(createTransactionDto: CreateTransactionDto) {
    try {
      createTransactionDto.id = uuidv4();
      const newWarehouse = new WarehouseTransactio(createTransactionDto);
      await newWarehouse.save();
      return { message: 'Successful add WarehouseTransactio.' };
    } catch (error) {
      return { message: 'WarehouseTransactio add failed.' };
    }
  }

  async findAll() {
    const allOrganizations = await WarehouseTransactio.scan().exec();
    return allOrganizations;
  }

  async findOne(id: string) {
    try {
      const organization = await WarehouseTransactio.get(id);
      return organization;
    } catch (err) {
      return undefined;
    }
  }
}