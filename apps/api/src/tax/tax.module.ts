import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaxProfile, TaxProfileSchema } from './schemas/tax-profile.schema';
import { TaxService } from './tax.service';
import { TaxController } from './tax.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaxProfile.name, schema: TaxProfileSchema },
    ]),
  ],
  controllers: [TaxController],
  providers: [TaxService],
})
export class TaxModule {}
