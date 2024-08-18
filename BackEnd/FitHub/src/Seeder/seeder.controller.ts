import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get()
  async addSeeders() {
    return await this.seederService.addSeeders();
  }

  @Get('2')
  async addSeeders2() {
    return await this.seederService.addSeeders2();
  }

  @Get('3')
  async addSeeders3() {
    return await this.seederService.addSeeders3();
  }
  @Get('4')
  async addSeeders4() {
    return await this.seederService.addSeeders4();
  }
}
