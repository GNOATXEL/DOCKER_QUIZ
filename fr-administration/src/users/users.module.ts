import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Association} from "../associations/association.entity";
import {AssociationsService} from "../associations/associations.service";
import {AssociationsController} from "../associations/associations.controller";
import {AssociationsModule} from "../associations/associations.module";
import {RolesModule} from "../roles/roles.module";


@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AssociationsModule)],
  controllers: [UsersController],
  providers: [UsersService ],
  exports: [UsersService]
})
export class UsersModule {}
