// 2controller.ts
import {Controller, Get, Body, Post, Param, Put, HttpException, HttpStatus, Delete, UseGuards} from '@nestjs/common';
import { Role } from './role.entity';
import {isUndefined} from "@nestjs/common/utils/shared.utils";
import {RolesService} from "./roles.service";
import {ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
import {RoleInput} from "./role.input";
import {AuthGuard} from "@nestjs/passport";
import {RoleUpdate} from "./role.update";
import {UsersService} from "../users/users.service";
import {AssociationsService} from "../associations/associations.service"; // Assurez-vous que le chemin d'importation est correct




@ApiTags('roles')
@Controller('roles')
export class RolesController {
    constructor(private service: RolesService) {
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The role has been successfully created.'
    })
    async create(@Body() input: RoleInput): Promise<Role> {
        return this.service.create(input.name, input.idUser, input.idAssociation);
    }

    //@UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiCreatedResponse({
        description: 'Roles have been successfully returned'
    })
    async getAllRoles(): Promise<Role[]> {
        return await this.service.getAllRoles();
    }

    @Get(':idU/:idA')
    @ApiCreatedResponse({
        description: 'Role has been successfully returned'
    })
    async getById(@Param() parameter): Promise<Role> {
        const a = this.service.getById(parameter.idU, parameter.idA);
        if (a != undefined) {
            return a;
        } else {
            throw new HttpException(
                `Could not find a role with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Put(':idU/:idA')
    @ApiCreatedResponse({
        description: 'Role has been successfully modified'
    })
    async update(@Param() parameter, @Body() input: RoleUpdate): Promise<void> {
        if (!this.service.update(parseFloat(parameter.idU),parseFloat(parameter.idA),input.name)) {
            throw new HttpException(
                `Could not find a role with the ids ${parameter.idU} & ${parameter.idA}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Delete(':idU/:idA')
    @ApiCreatedResponse({
        description: 'The role has been successfully deleted.'
    })
    async deleteUser(@Param() parameter): Promise<boolean> {
        if (await this.service.deleteRole(parameter.iU,parameter.idA)) {
            return true;
        } else {
            throw new HttpException(
                `Could not find a role with the ids ${parameter.idU} & ${parameter.idA}`,
                HttpStatus.NOT_FOUND,);
        }
    }
}


