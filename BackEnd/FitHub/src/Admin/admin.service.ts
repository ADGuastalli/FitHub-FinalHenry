import { Injectable } from "@nestjs/common";
import { AdminRepository } from "./admin.Repository";

@Injectable()
export class AdminService {
    constructor(private readonly adminRepository:AdminRepository) {}
    async solicitudPending(id:string) {
        return await this.adminRepository.solicitudPending(id);
    }

    async responderSolicitud(id:string, respuesta, coach?:string[], plan?:string[], rutina?:string[]) {
        console.log(coach.length, plan, rutina,respuesta);
        if(coach.length > 0) {
            if(respuesta === 'aceptar') {
                for (const profe of coach) {
                    await this.adminRepository.aceptarSolicitud(id, profe);
                }
            }
            if(respuesta === 'corregir') {
                for (const profe of coach) {
                    await this.adminRepository.corregirSolicitud(id, profe);
                }
            }
            if(respuesta === 'denegar') {
                for (const profe of coach) {
                    await this.adminRepository.denegarSolicitud(id, profe);
                }
            }
        } 
        if (plan.length > 0) {

            if(respuesta === 'aceptar') {
                for (const planRes of plan) {
                    await this.adminRepository.aceptarSolicitud(id, null ,planRes);
                }
            }
            if(respuesta === 'corregir') {
                for (const planRes of plan) {
                    await this.adminRepository.corregirSolicitud(id, null ,planRes);
                    
                }
            }
            if(respuesta === 'denegar') {
                for (const planRes of plan) {
                    await this.adminRepository.denegarSolicitud(id, null ,planRes);
                }
            }
        }
        if (rutina.length > 0) {

            if(respuesta === 'aceptar') {
                for (const rutinaRes of rutina) {
                    await this.adminRepository.aceptarSolicitud(id, null, null, rutinaRes);
                }
            }
            if(respuesta === 'corregir') {
                for (const rutinaRes of rutina) {
                    await this.adminRepository.corregirSolicitud(id, null, null, rutinaRes);
                }
            }
            if(respuesta === 'denegar') {
                for (const rutinaRes of rutina) {
                    await this.adminRepository.denegarSolicitud(id, null, null, rutinaRes);
                }
            }
        }
        return "Solicitud respondida";
    }
    
}
