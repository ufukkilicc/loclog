import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AreasService } from './areas.service';
import { Area } from './entities/area.entity';

@Module({
  imports: [DatabaseModule.forFeature([Area])],
  providers: [AreasService],
  exports: [AreasService]
})
export class AreasModule { }
