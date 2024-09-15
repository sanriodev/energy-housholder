import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { MongoDatabaseProviderModule } from './config/database/mongo/provider/mongo-provider.module';
import { EnergyEntryModule } from './modules/energy-entry/energy-entry.module';

@Module({
  imports: [AppConfigModule, MongoDatabaseProviderModule, EnergyEntryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
