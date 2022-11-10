import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  //usamos @Inject para injectar el valor que compartimos en app.module
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}

  getHello(): string {
    console.log('task: ', this.tasks[0]);
    return `this is my ${this.apiKey}`;
  }
}
