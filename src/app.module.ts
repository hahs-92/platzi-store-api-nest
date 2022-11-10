import { Module } from '@nestjs/common';

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
  imports: [HttpModule, ProductsModule, UsersModule, SharedModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'API_KEY', useValue: API_KEY },
    {
      provide: 'TASKS',
      // no es recomendable llamar apis, solo se hizo por cuestiones de enseñanza
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
