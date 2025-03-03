import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { AreasService } from './areas/areas.service';
import { CreateAreaDto } from './areas/dto/createArea.dto';
import { PaginationQueryDto } from './dtos/paginationQuery.dto';
import { CreateLocationDto } from './locations/dto/createLocation.dto';
import { LocationsService } from './locations/locations.service';

@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(private readonly locationsService: LocationsService,
    private readonly areasService: AreasService,
  ) { }

  @Get("logs")
  getLocationLogs(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.locationsService.findAll(paginationQueryDto.skip, paginationQueryDto.limit)
  }

  @Get("areas")
  getAreas(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.areasService.findAll(paginationQueryDto.page, paginationQueryDto.limit)
  }

  @Post("areas")
  postArea(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto)
  }

  @Post("locations")
  postLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto)
  }

}
