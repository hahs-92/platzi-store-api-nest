import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //agregamos validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //elimina los datos que no esten en el dto
      forbidNonWhitelisted: true, // informa cuando nos envian datos extras

      // EVITAR ENVIAR MENSAGES AL CLIENTE
      // disableErrorMessages:
      //   process.env.ENVIROMENT === 'production' ? true : false,
    }),
  );
  await app.listen(3000);
}
bootstrap();
