// 2controller.ts
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { Association } from './association.entity';
import { AssociationsService } from './associations.service';
import {User} from "../users/user.entity";
import {ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
import {AssociationInput} from "./association.input";
import {Minute} from "../minutes/minute.entity";
import {MinutesService} from "../minutes/minutes.service";

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
    constructor(private service: AssociationsService, private serviceM: MinutesService) {
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The association has been successfully created.'
    })
    async create(@Body() input: AssociationInput): Promise<Association> {
        return this.service.create(input.idUsers, input.name);
    }

    @Get()
    @ApiCreatedResponse({
        description: 'Associations have been successfully returned.'
    })
    async getAllAssociations(): Promise<Association[]> {
        return this.service.getAllAssociations();
    }

    @Get(':id')
    @ApiCreatedResponse({
        description: 'The association has been successfully returned.'
    })
    async getById(@Param() parameter): Promise<Association> {
        console.log('aaa')
        const a = this.service.getById(parameter.id);
        if (a != undefined) {
            return a;
        } else {
            throw new HttpException(
                `Could not find an association with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Put(':id')
    @ApiCreatedResponse({
        description: 'Association successfully updated'
    })
    async update(@Param() parameter, @Body() input: any): Promise<void> {
        if (!this.service.update(parseFloat(parameter.id),input.idUsers, input.name)) {
            throw new HttpException(
                `Could not find an association with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Delete(':id')
    @ApiCreatedResponse({
        description: 'The Association has been successfully deleted.'
    })
   async deleteAssociation(@Param() parameter): Promise <boolean> {
        if (this.service.deleteAssociation(parameter.id)) {
            return true;
        } else {
            throw new HttpException(
                `Could not find an association with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,);
        }
    }

    @ApiCreatedResponse({
        description: 'Members successfully returned.'
    })
    @Get(':id/members')
    async getMembers(@Param() parameter): Promise<User[]> {
        return this.service.getMembers(parameter.id);
    }

     @Get(':id/minutes')
     async getMinutes(@Param() parameter): Promise<Minute[]>{
         return this.serviceM.getMinutesOfAssociation(parseInt(parameter.id));
     }

    @Get('search/:query')
    async getByQuery(@Param() parameter): Promise<Association[]> {
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
}

