import { Injectable, Inject } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  //usamos @Inject para injectar el valor que compartimos en app.module
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    private configService: ConfigService,
  ) {}

  getHello(): string {
    // console.log('task: ', this.tasks[0]);
    // return `this is my ${this.apiKey}`;

    return `my api: ${this.configService.get<string>('API_KEY')}`;
  }
}
