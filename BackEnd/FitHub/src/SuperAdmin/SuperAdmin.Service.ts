import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/User/User.entity";
import { UserRole } from "src/User/User.enum";
import { Admin, Repository } from "typeorm";

@Injectable()
export class SuperAdminService {
    constructor(@InjectRepository(Users) private readonly usersRepository:Repository<Users>) {}

    async createAdmin(user: string, body: any) {
        const admin = await this.usersRepository.findOne({where:{id:user}});
        if(admin.role===UserRole.SUPERADMIN){
           const newAdmin = await this.usersRepository.findOne({where:{email:body.email}});
              if(newAdmin){
                newAdmin.role = UserRole.ADMIN;
                await this.usersRepository.save(newAdmin);
                return newAdmin;
              }
        }else {
          throw new BadRequestException('No tiene permiso para acceder a esta ruta');
        }
    }

    async deleteAdmin(user: string, body: any) {
        const admin = await this.usersRepository.findOne({where:{id:user}});
        if(admin.role===UserRole.SUPERADMIN){
           const newAdmin = await this.usersRepository.findOne({where:{email:body.email}});
              if(newAdmin){
                newAdmin.role = UserRole.USER;
                await this.usersRepository.save(newAdmin);
                return newAdmin;
              }
        }else {
          throw new BadRequestException('No tiene permiso para acceder a esta ruta');
        }
    }

}