import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationQueryDto {
    @IsNumber()
    @Transform(({ value }) => Number(value))
    page: number;

    @IsNumber()
    @Transform(({ value }) => Number(value))
    limit: number;

    get skip(): number {
        return this.page && this.limit ? (this.page - 1) * this.limit : undefined;
    }
}
