import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/user.entity";
import {In, Not, Repository} from "typeorm";
import {Song} from "./song.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
    ) {}


    async create(link: string, start: number, end: number, name: string, group: string): Promise<Song> {
        if(link!=undefined && start!=undefined && end!=undefined && name!=undefined) {

            const s = new Song(link, start, end, name, group);
            await this.songRepository.save(s);
            return s;
        }
        else{
            throw new HttpException(
                `Incorrect parameters`,
                HttpStatus.NOT_FOUND,
            );}
    }

    public async getById(idToFind: number): Promise<Song> {
        return await this.songRepository.findOne({where: {id: idToFind}});
    }

    public async getAllSongs(): Promise<Song[]> {
        return this.songRepository.find();
    }

    public async clear(): Promise<void>{
        this.songRepository.clear ();
    }

    public async getSmallestId(): Promise<number> {
        const queryResult = await this.songRepository.createQueryBuilder('song')
            .select('MIN(song.id)', 'minId')
            .getRawOne();

        return queryResult.minId || 0; // Retourne 0 si aucun enregistrement trouvé
    }

    public async getMaxId(): Promise<number> {
        const queryResult = await this.songRepository.createQueryBuilder('song')
            .select('MAX(song.id)', 'maxId')
            .getRawOne();

        return queryResult.maxId || 0; // Retourne 0 si aucun enregistrement trouvé
    }


    public async count(): Promise<number[]> {
        let nogi = await this.songRepository.count({where:{group: 'Nogizaka46\r'}})
        let saku = await this.songRepository.count({where:{group: 'Sakurazaka46\r'}})
        let hina = await this.songRepository.count({where:{group: 'Hinatazaka46\r'}})
        let keya = await this.songRepository.count({where:{group: 'Keyakizaka46\r'}})
        let cross= await this.songRepository.count({where: {group:
                    Not(In(['Nogizaka46\r', 'Keyakizaka46\r', 'Hinatazaka46\r', 'Sakurazaka46\r'])),},})
        return [nogi,saku,hina,keya,cross];
    }
}
