import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

//documentation
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

      transformOptions: {
        // para habilitar la transformacion de los queries
        // limit and offset, de string a number
        // todos los queryparams que sean numeros los
        // transforma todos los numeros a number
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Platzi store')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // PARA QUE LOS DTOS SE DOCUMENTEN DEBEMOS AGREGAR UNA
  // CONFIGURACION EXTRA EN nest-cli.json
  // PODEMOS VER EN LA DOC EN LA SECTION DE openAPI

  // se debe borrar l carpeta dist cuando se agregan cambios
  // para swagger

  //cors
  app.enableCors();

  //serializable
  // https://docs.nestjs.com/techniques/serialization
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
}
bootstrap();
