import { Module } from '@nestjs/common';
import { EnergyEntryService } from './energy-entry.service';
import { EnergyEntryController } from './energy-entry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EnergyEntry,
  EnergyEntrySchema,
} from '../../schemas/energy-entry.schema';
import { ModbusReaderModule } from '../modbus-reader/modbus-reader.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EnergyEntry.name,
        schema: EnergyEntrySchema,
      },
    ]),
    ModbusReaderModule,
  ], // Add any imported modules here
  controllers: [EnergyEntryController], // Add any controllers here
  providers: [EnergyEntryService],
  exports: [EnergyEntryService], // Add any providers (services) here
})
export class EnergyEntryModule {}
