import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
import {UsersService} from "../users/users.service";
import {AuthService} from "./auth.service";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }
    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiCreatedResponse({
        description: 'Success'
    })

    public async login(@Request() request) {
        return this.authService.login(request.user);
    }
}