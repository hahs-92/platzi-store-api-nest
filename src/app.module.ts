import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';

// podemos compartir valores e injectarlos
// este valor se injecta en app.service
const API_KEY = '788yhui';

@Module({
  imports: [ProductsModule, UsersModule, SharedModule],
  controllers: [AppController],
  providers: [AppService, { provide: 'API_KEY', useValue: API_KEY }],
  exports: [],
})
export class AppModule {}
