/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './User.service';
import { UpdateUserDto } from './CreateUser.Dto';
import { AuthGuard } from 'src/Guard/AuthGuar.guard';
import { ApiTags } from '@nestjs/swagger';
import { solicitudCoachDto } from './SolicitudCoachDto';
import { Roles, UserRole } from './User.enum';
import { RolesGuard } from 'src/Guard/roles.guard';

@ApiTags('Usuarios')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('coach')
  getCoach() {
    return this.userService.getCoach();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Req() req, @Param('id') id: string) {
    const user = req.user;
    const idUser = user.sub;
    return this.userService.getUsersById(id, idUser);
  }

  @Get('/userpyr/:id')
  @UseGuards(AuthGuard)
  getUserByIdPyR(@Req() req, @Param('id') id: string) {
    const user = req.user;
    const idUser = user.sub;
    return this.userService.getUserByIdPyR(id, idUser);
  }
  @Get('/entrenadorpyr/:id')
  @UseGuards(AuthGuard)
  getEntrenadorByIdPyR(@Req() req, @Param('id') id: string) {
    const user = req.user;
    const idUser = user.sub;

    return this.userService.getEntrenadorByIdPyR(id, idUser);
  }

  @Post('solictud')
  @UseGuards(AuthGuard)
  solicitudCoach(@Req() req, @Body() body: solicitudCoachDto) {
    const userId = req.user.sub;
    return this.userService.solicitudCoach(userId, body);
  }
  @Put()
  updateUser(@Body() user: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(user, id);
  }

  @Delete()
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
