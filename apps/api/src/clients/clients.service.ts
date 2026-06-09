import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Client, ClientDocument } from './schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  create(owner: string, dto: CreateClientDto): Promise<ClientDocument> {
    return this.clientModel.create({
      ...dto,
      owner: new Types.ObjectId(owner),
    });
  }

  findAll(owner: string, search?: string): Promise<ClientDocument[]> {
    const filter: FilterQuery<ClientDocument> = {
      owner: new Types.ObjectId(owner),
    };
    if (search) {
      const rx = new RegExp(search.trim(), 'i');
      filter.$or = [{ name: rx }, { email: rx }, { company: rx }];
    }
    return this.clientModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findOne(owner: string, id: string): Promise<ClientDocument> {
    const client = await this.clientModel
      .findOne({ _id: id, owner: new Types.ObjectId(owner) })
      .exec();
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async update(
    owner: string,
    id: string,
    dto: UpdateClientDto,
  ): Promise<ClientDocument> {
    const client = await this.clientModel
      .findOneAndUpdate({ _id: id, owner: new Types.ObjectId(owner) }, dto, {
        new: true,
      })
      .exec();
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async remove(owner: string, id: string): Promise<void> {
    const res = await this.clientModel
      .deleteOne({ _id: id, owner: new Types.ObjectId(owner) })
      .exec();
    if (res.deletedCount === 0) throw new NotFoundException('Client not found');
  }
}
