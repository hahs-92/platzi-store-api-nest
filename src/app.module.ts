import { Module } from '@nestjs/common';

//lo debemos importar asi para que funcione
import * as Joi from 'joi';

//se instala por separado
//nos permite manejar variables de entorno
import { ConfigModule } from '@nestjs/config';

import { environments } from './environments';
import config from './config';

// se necesita instalar por separado
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from './database/database.module';

// podemos compartir valores e injectarlos
// este valor se injecta en app.service
const API_KEY = '788yhui';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      //lo usamos en userService y appservice
      //archivo a leer
      //para establecer variables
      //NODE_ENV=prod npm run start:dev
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      //le pasamos nuestra config, con la cual tenemos tipado para los env
      load: [config],
      isGlobal: true,
      //para validar nuestras env que si sean lo que necesitamos
      // tambien podriamos usar class-validator
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_HOST: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    ProductsModule,
    UsersModule,
    SharedModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'API_KEY', useValue: API_KEY },
    {
      provide: 'TASKS',
      // no es recomendable llamar apis, solo se hizo por cuestiones de ense??anza
      // Use Factory es una fabrica de provider para resolver algo asincrona y recibiendo una injeccion
      useFactory: async (http: HttpService) => {
        const response = http.get(`https://jsonplaceholder.typicode.com/todos`);

        const tasks = await firstValueFrom(response);

        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
  exports: [],
})
export class AppModule {}
