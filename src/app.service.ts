import { Injectable, Inject } from '@nestjs/common';

import { ConfigService, ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  //usamos @Inject para injectar el valor que compartimos en app.module
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    // private configService: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('PG') private clientPG: Client,
  ) {}

  getHello(): string {
    // console.log('task: ', this.tasks[0]);
    // return `this is my ${this.apiKey}`;

    // return `my api: ${this.configService.get<string>('API_KEY')}`;

    //de esta manera tenemos tipadas las env
    return `my api: ${this.configService.apiKey}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPG.query('SELECT * FROM tasks', (err, res) => {
        console.log(err);
        console.log('RES: ', res.rows);

        if (err) {
          reject(err);
        }

        resolve(res.rows);
      });
    });
  }
}
