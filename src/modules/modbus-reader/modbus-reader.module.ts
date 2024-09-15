import { Module } from '@nestjs/common';
import { ModbusReaderService } from './modbus-reader.service';

@Module({
  imports: [], // Add any imported modules here
  controllers: [], // Add any controllers here
  providers: [ModbusReaderService],
  exports: [ModbusReaderService], // Add any providers (services) here
})
export class ModbusReaderModule {}
