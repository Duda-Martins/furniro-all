import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'furniro.db',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    ProductModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

// Testing.
