import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './filter/exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = await app.get(ConfigService)

  // const config = new DocumentBuilder()
  //   .setTitle('API Documentation')
  //   .setDescription('Location Logger API')
  //   .build();
  // const documentFactory = () => SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('swagger', app, documentFactory);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(configService.get<string>('HTTP_PORT'));
}
bootstrap();
