import {Body, Delete, Get, HttpException, HttpStatus, Injectable, NotFoundException, Param} from '@nestjs/common';
import { User } from '../users/user.entity';
import {UsersService} from "../users/users.service";
import {JwtModule, JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {


  constructor(private userService: UsersService,private  jwtService: JwtService) {}

  public async validateUser(id: number, password: string): Promise<User | undefined> {
    const user = await this.userService.getById(id);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return undefined;
  }

  async login(user: any) {
    const payload = { username: user.id };return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
