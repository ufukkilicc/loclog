import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { Location } from './entities/location.entity';
import { LocationsService } from './locations.service';
import { AreasModule } from 'src/areas/areas.module';

@Module({
  imports: [DatabaseModule.forFeature([Location]), AreasModule],
  providers: [LocationsService],
  exports: [LocationsService]
})
export class LocationsModule { }
