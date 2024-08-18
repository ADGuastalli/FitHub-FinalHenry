import { Body, Controller, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/Guard/AuthGuar.guard";
import { SuperAdminService } from "./SuperAdmin.Service";
import { superAdminDto } from "./SuperAdmin.dto";

@Controller('superadmin')
export class SuperAdminController {
    constructor(private readonly superAdminService:SuperAdminService) {}
    @Post('create')
    @UseGuards(AuthGuard)
    async createAdmin(@Req() req, @Body() body: superAdminDto) {
        const user = req.user.sub;
        return await this.superAdminService.createAdmin(user, body);
    }
    @Post('delete')
    @UseGuards(AuthGuard)
    async deleteAdmin(@Req() req, @Body() body: superAdminDto) {
        const user = req.user.sub;
        return await this.superAdminService.deleteAdmin(user, body);
    }
    
}