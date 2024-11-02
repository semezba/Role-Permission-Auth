import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
  });
  app.enableCors();
  app.setGlobalPrefix('api');

  /* Swagger Setup */
  const config = new DocumentBuilder()
    .setTitle('Simplify Global Education')
    .setDescription('SGE - All API')
    .setVersion('1.0')
    .addTag('SGE API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  let port = process.env.PORT || 5000;
  await app.listen(port, () => {
    console.log(
      '\x1b[1m\x1b[35m%s\x1b[0m',
      '---------------------------------------------------',
    );
    console.log(
      '\x1b[32m%s\x1b[0m',
      `App Is Running On : http://localhost:${port} `,
    );
    console.log(
      '\x1b[32m%s\x1b[0m',
      `Api Documentation : http://localhost:${port}/api`,
    );
    console.log(
      '\x1b[1m\x1b[35m%s\x1b[0m',
      '---------------------------------------------------',
    );
  });
}
bootstrap();
