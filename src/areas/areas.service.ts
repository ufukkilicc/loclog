import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Geometry, Point, Repository } from 'typeorm';
import { CreateAreaDto } from './dto/createArea.dto';
import { Area } from './entities/area.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areasRepository: Repository<Area>,
  ) { }

  async create(createAreaDto: CreateAreaDto) {
    const polygonGeoJSON: Geometry = {
      type: "Polygon",
      coordinates: createAreaDto.polygon.map(polygonRing =>
        polygonRing.ring.map(coord => coord.coordinates)
      ),
    };
    await this.areasRepository.query(
      `INSERT INTO areas ("name", "polygon") VALUES ($1, ST_GeomFromGeoJSON($2))`,
      [createAreaDto.name, JSON.stringify(polygonGeoJSON)],
    );
  }

  async findAll(skip: number, limit: number) {
    const [data, total] = await this.areasRepository.createQueryBuilder("area")
      .select(["area.id", "area.name", "area.polygon"])
      .skip(skip)
      .take(limit)
      .getManyAndCount()

    return { data, total, page: skip, limit }
  }

  async matchingAreaPoint(pointGeoJSON: Point) {
    const matchingArea = await this.areasRepository.query(
      `SELECT id FROM areas WHERE ST_Contains(polygon, ST_GeomFromGeoJSON($1))`,
      [JSON.stringify(pointGeoJSON)],
    );
    return matchingArea.length > 0 ? matchingArea[0].id : null;
  }
}