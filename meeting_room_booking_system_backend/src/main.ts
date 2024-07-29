import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置全局验证管道
  app.useGlobalPipes(new ValidationPipe());

  // 配置swagger
  const config = new DocumentBuilder()
    .setTitle('会议室预定系统')
    .setDescription('一个 React + AntD + Nest + Nginx + Mysql +  Redis 项目')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
