import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

//driver coneccion con postgress
import { Client } from 'pg';

//coneccion con typeorm
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config';

const API_KEY = '788yhui';

// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'platzi-store-nest',
//   password: 'TravelMate2420',
//   port: 5432,
// });

// client.connect();

// el servcio es quien va a ejecutar esta data
// client.query('SELECT * FROM tasks', (err, res) => {
//   console.log(err);
//   console.log('RES: ', res.rows);
// });

@Global() // le indicamos que todo lo que este en este modulo es para uso global
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { name, host, password, port, user } = configService.database;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: name,
          // false xq ahora creamos las tablas con migrations
          synchronize: false, // solo en dev, para que nos cree las tablas
          autoLoadEntities: true, // busca las entities para que las pueda sincronizar
        };
      },
    }),
  ],
  providers: [
    { provide: 'API_KEY', useValue: API_KEY },
    // { provide: 'PG', useValue: client },
    // en vez de useValue, ahora usamos el factory para injectar nuestra conf de envs
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { name, host, password, port, user } = configService.database;

        //creamos la connecion
        const client = new Client({
          user: user,
          host: host,
          database: name,
          password: password,
          port: port,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule], // Le indicamos que se puede utilizar en cualquier otro modulo
})
export class DatabaseModule {}
