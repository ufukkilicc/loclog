import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AreasModule } from './areas/areas.module';
import { DatabaseModule } from './database/database.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [CacheModule.register({ isGlobal: true }), DatabaseModule, LocationsModule, AreasModule],
  controllers: [AppController],
})
export class AppModule { }
