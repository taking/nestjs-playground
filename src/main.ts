import { ValidationPipe } from "@nestjs/common";
import { AppConfig } from '@config/configuration';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@root/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { HttpExceptionFilter } from '@exceptions/http-exception.filter'

async function bootstrap() {
  const appOptions = {
    logger: true,
  };
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(appOptions),
  );
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());

  // whiteList -> 엔티티 데코레이터에 없는 프로퍼티 값은 무조건 거름
  // forbidNonWhitelisted -> 엔티티 데코레이터에 없는 값 인입시 그 값에 대한 에러메세지 알려줌
  // transform -> 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  const config = new DocumentBuilder()
    .setTitle('NestJS PlayGround App')
    .setDescription('by taking (taking@duck.com)')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);  

  const appConfig = AppConfig().app;
  const host = appConfig.host;
  const port = appConfig.port;
  
  await app.listen(port, host);
  console.log(`Application is running on: ${host}:${port}`);
}
bootstrap();
