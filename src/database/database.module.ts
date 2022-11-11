import { Module, Global } from '@nestjs/common';

//driver coneccion con postgress
import { Client } from 'pg';

const API_KEY = '788yhui';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'platzi-store-nest',
  password: 'TravelMate2420',
  port: 5432,
});

client.connect();

// el servcio es quien va a ejecutar esta data
// client.query('SELECT * FROM tasks', (err, res) => {
//   console.log(err);
//   console.log('RES: ', res.rows);
// });

@Global() // le indicamos que todo lo que este en este modulo es para uso global
@Module({
  providers: [
    { provide: 'API_KEY', useValue: API_KEY },
    { provide: 'PG', useValue: client },
  ],
  exports: ['API_KEY', 'PG'], // Le indicamos que se puede utilizar en cualquier otro modulo
})
export class DatabaseModule {}
