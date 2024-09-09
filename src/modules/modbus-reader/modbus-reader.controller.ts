import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ModbusReaderService } from './modbus-reader.service';

@Controller('modbus-reader')
@ApiTags('modbus-reader')
export class ModbusReaderController {
  constructor(
    @Inject(ModbusReaderService)
    private readonly modbusReaderService: ModbusReaderService,
  ) {}
}
