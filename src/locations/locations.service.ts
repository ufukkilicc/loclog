import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AreasService } from 'src/areas/areas.service';
import { Point, Repository } from 'typeorm';
import { CreateLocationDto } from './dto/createLocation.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {

  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
    private readonly areasService: AreasService) { }


  async create(createLocationDto: CreateLocationDto) {
    const pointGeoJSON: Point = {
      type: "Point",
      coordinates: createLocationDto.point.coordinates
    };
    const matchingAreaId = await this.areasService.matchingAreaPoint(pointGeoJSON)
    if (matchingAreaId) {
      await this.locationsRepository.query(
        'INSERT INTO locations ("userId", "point", "areaId") VALUES ($1, ST_GeomFromGeoJSON($2), $3)',
        [createLocationDto.userId, JSON.stringify(pointGeoJSON), matchingAreaId],
      );
    }
  }

  async findAll(skip: number, limit: number) {
    const [data, total] = await this.locationsRepository.createQueryBuilder("location")
      .select(["location.id", "location.userId", "location.point", "location.entryTime", "location.areaId"])
      .skip(skip)
      .take(limit)
      .getManyAndCount()

    return { data, total, page: skip, limit }
  }

}
