import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { MongoDatabaseProviderModule } from './config/database/mongo/provider/mongo-provider.module';
import { ModbusReaderModule } from './modules/modbus-reader/modbus-reader.module';

@Module({
  imports: [AppConfigModule, MongoDatabaseProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
