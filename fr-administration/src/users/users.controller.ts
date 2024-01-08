// 2controller.ts
import {Controller, Get, Body, Post, Param, Put, HttpException, HttpStatus, Delete, UseGuards} from '@nestjs/common';
import { User } from './user.entity';
import {isUndefined} from "@nestjs/common/utils/shared.utils";
import {UsersService} from "./users.service";
import {ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
import {UserInput} from "./user.input";
import {AuthGuard} from "@nestjs/passport";
import {Association} from "../associations/association.entity";
import {AssociationsService} from "../associations/associations.service"; // Assurez-vous que le chemin d'importation est correct

const users: User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John',
        age: 23,
        password: '123'
    },

];
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private service: UsersService, private serviceA: AssociationsService) {
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The user has been successfully created.'
    })
    public async create(@Body() input: UserInput): Promise<User> {
       return this.service.create(input.lastname, input.firstname, input.age, input.password);
    }

    //@UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiCreatedResponse({
        description: 'Users have been successfully returned'
    })
    async getAllUsers(): Promise<User[]> {
        return await this.service.getAllUsers();
    }

    @Get(':id')
    @ApiCreatedResponse({
        description: 'User has been successfully returned'
    })
    async getById(@Param() parameter): Promise<User> {
        const a = this.service.getById(parameter.id);
        if (a != undefined) {
            return a;
        } else {
            throw new HttpException(
                `Could not find a user with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Get('search/:query')
    async getByQuery(@Param() parameter): Promise<User[]> {
        const a = this.service.getByQuery(parameter.query);
        if (a != undefined) {
            return a;
        } else {
            throw new HttpException(
              `Could not find users`,
              HttpStatus.NOT_FOUND,
            );
        }
    }

    @Put(':id')
    @ApiCreatedResponse({
        description: 'User has been successfully modified'
    })
    async update(@Param() parameter, @Body() input: UserInput): Promise<void> {
        if (!this.service.update(parseFloat(parameter.id),input.lastname, input.firstname, input.age, input.password)) {
            throw new HttpException(
                `Could not find a user with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Delete(':id')
    @ApiCreatedResponse({
        description: 'The user has been successfully deleted.'
    })
    async deleteUser(@Param() parameter): Promise<boolean> {
        if (this.service.deleteUser(parameter.id)) {
            return true;
        } else {
            throw new HttpException(
                `Could not find a user with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,);
        }
    }

     @Get(':id/associations')
     async getAssociations(@Param() parameter): Promise<Association[]>{
         return this.serviceA.getAssociationsOfMember(parseInt(parameter.id));
 }

}


