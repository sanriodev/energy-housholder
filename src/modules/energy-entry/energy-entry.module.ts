import { Module } from '@nestjs/common';
import { EnergyEntryService } from './energy-entry.service';
import { EnergyEntryController } from './energy-entry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EnergyEntry,
  EnergyEntrySchema,
} from '../../schemas/energy-entry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EnergyEntry.name,
        schema: EnergyEntrySchema,
      },
    ]),
  ], // Add any imported modules here
  controllers: [EnergyEntryController], // Add any controllers here
  providers: [EnergyEntryService],
  exports: [EnergyEntryService], // Add any providers (services) here
})
export class EnergyEntryModule {}
