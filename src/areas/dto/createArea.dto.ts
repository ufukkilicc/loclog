import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

class CoordinateDto {
    @IsArray()
    @IsNumber({}, { each: true })
    @ArrayMinSize(2, { message: 'Each coordinate must have exactly 2 values (longitude and latitude).' })
    @ArrayMaxSize(2, { message: 'Each coordinate must have exactly 2 values (longitude and latitude).' })
    coordinates: number[]
}

class PolygonRingDto {
    @IsArray()
    @ArrayMinSize(4, { message: 'A polygon ring must have at least 4 coordinates.' })
    @ValidateNested({ each: true })
    @Type(() => CoordinateDto)
    ring: CoordinateDto[]
}

export class CreateAreaDto {
    @IsString()
    name: string

    @IsArray()
    @ArrayMinSize(1, { message: 'At least one polygon ring is required.' })
    @ValidateNested({ each: true })
    @Type(() => PolygonRingDto)
    polygon: PolygonRingDto[]
}