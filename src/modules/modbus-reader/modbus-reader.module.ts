import { Module } from '@nestjs/common';
import { ModbusReaderService } from './modbus-reder.service';
import { EnergyEntryModule } from '../energy-entry/energy-entry.module';

@Module({
  imports: [EnergyEntryModule], // Add any imported modules here
  controllers: [], // Add any controllers here
  providers: [ModbusReaderService],
  exports: [ModbusReaderService], // Add any providers (services) here
})
export class ModbusReaderModule {}
