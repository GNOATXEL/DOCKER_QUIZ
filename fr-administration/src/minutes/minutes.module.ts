import {forwardRef, Module} from '@nestjs/common';
import { MinutesController } from './minutes.controller';
import { MinutesService } from './minutes.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Association} from "../associations/association.entity";
import {User} from "../users/user.entity";
import {UsersModule} from "../users/users.module";
import {AssociationsModule} from "../associations/associations.module";
import {Minute} from "./minute.entity";
import {UsersService} from "../users/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([Association, User, Minute]),forwardRef(() => UsersModule), forwardRef(() => AssociationsModule)] ,
  controllers: [MinutesController],
  providers: [MinutesService],
  exports: [MinutesService]
})
export class MinutesModule {}
