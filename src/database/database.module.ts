import { Module, Global } from '@nestjs/common';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ConfigType } from '@nestjs/config';

import config from '../config';

const API_KEY = '788yhui';

// const uri =
//   'mongodb+srv://hahs:XwgjTEmflrYKPYPO@cluster0.uxguvsc.mongodb.net/?retryWrites=true&w=majority';

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// };

// const client = new MongoClient(uri, options);

// async function run() {
//   await client.connect();

//   const database = client.db('platzi-store-nest');
//   const taskCollection = database.collection('tasks');
//   const tasks = await taskCollection.find().toArray();
// }

@Global() // le indicamos que todo lo que este en este modulo es para uso global
@Module({
  providers: [
    { provide: 'API_KEY', useValue: API_KEY },
    {
      // REALIZAMOS LA CONNECION
      // USANDO EL DRIVE NATIVO DE MONGO
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const {
          mongo: { dbName, uri },
        } = configService;

        const options = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverApi: ServerApiVersion.v1,
        };

        const client = new MongoClient(uri, options);
        await client.connect();

        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO'], // Le indicamos que se puede utilizar en cualquier otro modulo
})
export class DatabaseModule {}

// driver para mongo
// npm i mongodb
// npm i @types/mongodb -D
