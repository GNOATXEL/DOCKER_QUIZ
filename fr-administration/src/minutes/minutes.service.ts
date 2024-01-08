import {Body, Delete, Get, HttpException, HttpStatus, Injectable, NotFoundException, Param} from '@nestjs/common';
import { Minute } from './minute.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Association} from "../associations/association.entity";


@Injectable()
export class MinutesService {
    constructor(
        @InjectRepository(Minute)
        private minutesRepository: Repository<Minute>
    ) {}

    async create(content: string, idVoters: number[], date: string, idAssociation: number): Promise<Minute> {
        console.log(idAssociation);
        if(content!=undefined && idVoters!=undefined && date!=undefined && idAssociation!=undefined) {
            const m = new Minute(content, idVoters, date, idAssociation);
            await this.minutesRepository.save(m);
            return m;
        }
        else{
            throw new HttpException(
                `Incorrect parameters`,
                HttpStatus.NOT_FOUND,
            );}
    }

    public async getById(idToFind: number): Promise<Minute> {
        return await this.minutesRepository.findOne({where: {id: idToFind}});
    }


    public async update(id:number,content:string, idVoters: number[], date: string, idAssociation: number): Promise<boolean> {
        const temp = await this.minutesRepository.findOne({ where:{id: id}});
        if(!!temp){
            if(content!==undefined) {
                temp.content = content;
            }
            if(idVoters!==undefined) {
                temp.idVoters = idVoters;
            }
            if(date!==undefined) {
                temp.date = date;
            }

            if(idAssociation!==undefined) {
                temp.idAssociation = idAssociation;
            }
            await this.minutesRepository.save(temp);
            return true;

        }

        return false
    }

    public async deleteMinute(id:number): Promise<boolean> {
        const minute = await this.minutesRepository.findOne({where:{id}});

        if (!minute) {
            return false
        }

        await this.minutesRepository.remove(minute);
        return true;
    }

    public async getAllMinutes(): Promise<Minute[]> {
        return this.minutesRepository.find();
    }

     public async getMinutesOfAssociation(idAsso: number): Promise<Minute[]> {
         const minutes = await this.minutesRepository.find();
         console.log(minutes);

         return minutes.filter(minute => minute.idAssociation == idAsso);
     }
}
