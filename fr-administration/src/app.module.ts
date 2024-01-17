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
import {SongModule} from "./song/song.module";
import {Song} from "./song/song.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
              host: process.env.MYSQL_HOST,
              username: process.env.MYSQL_USER,
              password: process.env.MYSQL_PASSWORD,
              database: process.env.MYSQL_DATABASE,
              port: +process.env.MYSQL_PORT,

          //type: 'sqlite',
          //database: mydatabase.db',
              entities: [
                  User,
                  Association,
                  Role,
                  Minute,
                  Song
              ],
              synchronize: true,
      }),
      UsersModule,
      SongModule,
      AssociationsModule,
      AuthModule,
      RolesModule,
      MinutesModule,
  ],
  controllers: [AppController, RolesController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
