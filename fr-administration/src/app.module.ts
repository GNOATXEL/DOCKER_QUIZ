import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from "./users/users.module";
import { AssociationsModule } from './associations/associations.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Association} from "./associations/association.entity";
import {User} from "./users/user.entity";
import {AuthModule} from "./auth/auth.module";
import {RolesModule} from "./roles/roles.module";
import {Role} from "./roles/role.entity";
import { MinutesModule } from './minutes/minutes.module';
import { Minute } from './minutes/minute.entity';
import {RolesController} from "./roles/roles.controller";
import {AuthService} from "./auth/auth.service";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'sqlite',
              database: 'mydatabase.db',
              entities: [
                  User,
                  Association,
                  Role,
                  Minute
              ],
              synchronize: true,
      }),
      UsersModule,
      AssociationsModule,
      AuthModule,
      RolesModule,
      MinutesModule,
  ],
  controllers: [AppController, RolesController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
