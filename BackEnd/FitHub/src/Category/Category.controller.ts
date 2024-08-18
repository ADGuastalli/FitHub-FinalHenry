import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './Category.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './CreateCategory.dto';

@ApiTags('Categorías')
@Controller('categorias')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategorys() {
    return await this.categoryService.getCategorys();
  }

  @Post()
  async createCategory(@Body() category: CreateCategoryDto) {
    return await this.categoryService.createCategory(category);
  }
}
