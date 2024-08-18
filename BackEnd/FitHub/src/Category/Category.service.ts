import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './Category.repository';
import { CreateCategoryDto } from './CreateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategorys() {
    return await this.categoryRepository.getCategorys();
  }

  async createCategory(category: CreateCategoryDto) {
    return await this.categoryRepository.createCategory(category);
  }
}
