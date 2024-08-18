import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/User/User.entity";
import { SuperAdminController } from "./SuperAdmin.Controller";
import { SuperAdminService } from "./SuperAdmin.Service";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [SuperAdminController],
    providers: [SuperAdminService]
})
export class SuperAdminModule {}