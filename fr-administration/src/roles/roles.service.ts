import {Body, Delete, Get, HttpException, HttpStatus, Injectable, NotFoundException, Param} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Role} from "./role.entity";
import {UsersService} from "../users/users.service";
import {AssociationsService} from "../associations/associations.service";


@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        private Uservice: UsersService,
        private Aservice: AssociationsService,



    ) {}

    async create(name: string, idUser: number, idAssociation: number): Promise<Role> {
        if(name!=undefined && idUser!=undefined && idAssociation!=undefined) {
            const roel = new Role(name, await this.Uservice.getById(idUser), await this.Aservice.getById(idAssociation));
            await this.roleRepository.save(roel);
            console.log(roel);
            return roel;
        }
        else{
            throw new HttpException(
                `Incorrect parameters`,
                HttpStatus.NOT_FOUND,
           );}
    }

    
    
    public async getById(idUser: number, idAsso: number): Promise<Role> {
       return await this.roleRepository.findOne({ where: { user: {id:idUser}, association: {id:idAsso} }, relations: ['user', 'association'] } );
    }



    public async update(idUser:number,idAsso,name:string): Promise<boolean> {
        const temp = await this.roleRepository.findOne({ where: { user: {id:idUser}, association: {id:idAsso} }, relations: ['user', 'association'] } );
        if(!!temp){
            if(name!==undefined) {
                temp.name = name;
            }

            await this.roleRepository.save(temp);
            return true;

        }

        return false
    }

    public async deleteRole(idUser:number,idAsso:number): Promise<boolean> {
        const role = await this.roleRepository.findOne({ where: { user: {id:idUser}, association: {id:idAsso} }, relations: ['user', 'association'] } );

        if (!role) {
            console.log('bbbb');
            return false
        }
        console.log('aaaa');

        await this.roleRepository.delete(role);
        return true;
    }

    public async getAllRoles(): Promise<Role[]> {
        console.log(await this.roleRepository.find());
        return await this.roleRepository.find();
    }
}
