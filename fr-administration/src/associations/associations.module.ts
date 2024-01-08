import {forwardRef, Module} from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import {UsersModule} from "../users/users.module";
import {Association} from "./association.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/user.entity";
import {MinutesModule} from "../minutes/minutes.module";
import {MinutesService} from "../minutes/minutes.service";


@Module({
  providers: [AssociationsService],
  imports: [TypeOrmModule.forFeature([Association]),forwardRef(() => UsersModule),forwardRef(() => MinutesModule)] ,
  controllers: [AssociationsController],
  exports: [AssociationsService]
})
export class AssociationsModule {}
