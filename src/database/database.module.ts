import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.getOrThrow<string>('DB_HOST'),
                port: configService.getOrThrow<number>('DB_PORT'),
                username: configService.getOrThrow<string>('DB_USER'),
                password: configService.getOrThrow<string>('DB_PASS'),
                database: configService.getOrThrow<string>('DB_NAME'),
                synchronize: true,
                autoLoadEntities: true
            }),
            inject: [ConfigService],
        }),
    ]
})
export class DatabaseModule {
    static forFeature(models: EntityClassOrSchema[]) {
        return TypeOrmModule.forFeature(models);
    }
}
