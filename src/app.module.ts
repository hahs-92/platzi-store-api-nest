import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ProductsModule, UsersModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
