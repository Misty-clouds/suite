import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TaxProfile, TaxProfileDocument } from './schemas/tax-profile.schema';

@Injectable()
export class TaxService {
  constructor(
    @InjectModel(TaxProfile.name)
    private readonly model: Model<TaxProfileDocument>,
  ) {}

  get(owner: string): Promise<TaxProfileDocument | null> {
    return this.model.findOne({ owner: new Types.ObjectId(owner) }).exec();
  }

  upsert(
    owner: string,
    data: Record<string, string>,
  ): Promise<TaxProfileDocument | null> {
    return this.model
      .findOneAndUpdate(
        { owner: new Types.ObjectId(owner) },
        { data },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      )
      .exec();
  }
}
