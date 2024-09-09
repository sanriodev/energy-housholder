import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModbusReaderModule } from './modules/modbus-reader/modbus-reader.module';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [ModbusReaderModule, AppConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
