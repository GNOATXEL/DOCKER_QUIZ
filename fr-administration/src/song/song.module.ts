import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/user.entity";
import {Song} from "./song.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  providers: [SongService],
  controllers: [SongController],
  exports: [SongService]
})
export class SongModule {}
