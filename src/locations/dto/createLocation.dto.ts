import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsNumber, ValidateNested } from 'class-validator';

class PointDto {
    @IsNumber({}, { each: true })
    @ArrayMinSize(2, { message: 'Each coordinate must have exactly 2 values (longitude and latitude).' })
    @ArrayMaxSize(2, { message: 'Each coordinate must have exactly 2 values (longitude and latitude).' })
    coordinates: number[]
}


export class CreateLocationDto {
    @IsNumber()
    userId: number;

    @Type(() => PointDto)
    @ValidateNested()
    point: PointDto;
}