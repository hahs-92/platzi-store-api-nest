import { Injectable, Inject, Get } from '@nestjs/common';
import { Db } from 'mongodb';

import { ConfigService, ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AppService {
  //usamos @Inject para injectar el valor que compartimos en app.module
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject('MONGO') private database: Db,
    // private configService: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    // console.log('task: ', this.tasks[0]);
    // return `this is my ${this.apiKey}`;

    // return `my api: ${this.configService.get<string>('API_KEY')}`;

    //de esta manera tenemos tipadas las env
    return `my api: ${this.configService.apiKey}`;
  }

  getTask() {}
}
