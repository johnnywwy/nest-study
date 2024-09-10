import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { InvokeRecordInterceptor } from './invoke-record.interceptor';
import { UnloginFilter } from './unlogin.filter';
import { CustomExceptionFilter } from './custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置全局验证管道
  app.useGlobalPipes(new ValidationPipe()); //全局验证管道
  app.useGlobalInterceptors(new FormatResponseInterceptor()); //接口统一响应格式
  app.useGlobalInterceptors(new InvokeRecordInterceptor()); //接口调用记录
  app.useGlobalFilters(new UnloginFilter()); //未登录拦截器
  app.useGlobalFilters(new CustomExceptionFilter()); //自定义异常拦截器

  // 配置 CORS 以允许指定域名的跨域请求
  app.enableCors({
    origin: ['http://localhost:5173'], //
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'], // 添加 'x-requested-with'
  });

  // 配置swagger
  const config = new DocumentBuilder()
    .setTitle('会议室预定系统')
    .setDescription('一个 React + AntD + Nest + Nginx + Mysql +  Redis 项目')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: '基于 jwt 验证',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('nest_server_port'));
}
bootstrap();
