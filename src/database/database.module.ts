import { Module, Global } from '@nestjs/common';

const API_KEY = '788yhui';

@Global() // le indicamos que todo lo que este en este modulo es para uso global
@Module({
  providers: [{ provide: 'API_KEY', useValue: API_KEY }],
  exports: ['API_KEY'], // Le indicamos que se puede utilizar en cualquier otro modulo
})
export class DatabaseModule {}
