import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './Category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './CreateCategory.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategorys() {
    return this.categoryRepository.find();
  }

  async createCategory(category: CreateCategoryDto) {
    return this.categoryRepository.save(category);
  }
}
