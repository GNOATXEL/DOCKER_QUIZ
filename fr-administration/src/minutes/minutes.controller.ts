import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {User} from "../users/user.entity";
import {ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
import {UsersService} from "../users/users.service";
import {UserInput} from "../users/user.input";
import {MinutesService} from "./minutes.service";
import {MinuteInput} from "./minute.input";
import {Minute} from "./minute.entity";

@ApiTags('minutes')
@Controller('minutes')
export class MinutesController {
    constructor(private service: MinutesService) {
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The minute has been successfully created.'
    })
    public async create(@Body() input: MinuteInput): Promise<Minute> {
        return this.service.create(input.content, input.idVoters, input.date, input.idAssociation);
    }

    //@UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiCreatedResponse({
        description: 'Minutes have been successfully returned'
    })
    async getAllMinutes(): Promise<Minute[]> {
        return await this.service.getAllMinutes();
    }

    @Get(':id')
    @ApiCreatedResponse({
        description: 'Minute has been successfully returned'
    })
    async getById(@Param() parameter): Promise<Minute> {
        const a = this.service.getById(parameter.id);
        if (a != undefined) {
            return a;
        } else {
            throw new HttpException(
                `Could not find a minute with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Put(':id')
    @ApiCreatedResponse({
        description: 'Minute has been successfully modified'
    })
    async update(@Param() parameter, @Body() input: MinuteInput): Promise<void> {
        if (!this.service.update(parseFloat(parameter.id),input.content, input.idVoters, input.date, input.idAssociation)) {
            throw new HttpException(
                `Could not find a minute with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }


    @Delete(':id')
    @ApiCreatedResponse({
        description: 'The minute has been successfully deleted.'
    })
    async deleteUser(@Param() parameter): Promise<boolean> {
        if (this.service.deleteMinute(parameter.id)) {
            return true;
        } else {
            throw new HttpException(
                `Could not find a minute with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,);
        }
    }
}