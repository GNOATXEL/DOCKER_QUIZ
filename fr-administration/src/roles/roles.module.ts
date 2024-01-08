import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {UsersModule} from "../users/users.module";
import {AssociationsModule} from "../associations/associations.module";
import {Role} from "./role.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AssociationsService} from "../associations/associations.service";


@Module({
    providers: [RolesService],
    imports: [TypeOrmModule.forFeature([Role]),UsersModule, AssociationsModule] ,
    controllers: [RolesController],
    exports: [RolesService],
})
export class RolesModule {}
