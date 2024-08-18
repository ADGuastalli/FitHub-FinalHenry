import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AuthGuard } from "src/Guard/AuthGuar.guard";
import { resEnum } from "./resEnum";
import { RolesGuard } from "src/Guard/roles.guard";
import { Roles, UserRole } from "src/User/User.enum";
import { respuestaDto } from "./respuestaDto";

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService:AdminService) {}

    @Get('solicitudes')
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async solicitudPending(@Req() req){
        return await this.adminService.solicitudPending(req.user.sub);
    }

    @Post('solicitudCoach')
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async aceptarSolicitud(@Req() req, @Body() body:respuestaDto, @Query('respuesta') respuesta:resEnum){
        const {coach, plan, rutina} = body;
        return await this.adminService.responderSolicitud(req.user.sub, respuesta, coach, plan, rutina);
    }
    
}
