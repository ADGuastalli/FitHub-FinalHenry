import { Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { UserService } from './User.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './User.entity';
import { UsersRepository } from './User.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
  exports: [UsersRepository, UserService],
})
export class usersModule {}
