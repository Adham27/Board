/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './comman/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use global HTTP exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Set up Swagger
  const config = new DocumentBuilder()
    .setTitle('Kanban Board API')
    .setDescription('API documentation for the Kanban Board application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document); 

  await app.listen(3000);
}
bootstrap();
