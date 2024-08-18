import { Module } from '@nestjs/common';
import { CategoryController } from './Category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './Category.entity';
import { CategoryRepository } from './Category.repository';
import { CategoryService } from './Category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
