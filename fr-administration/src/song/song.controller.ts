import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {SongService} from "./song.service";
import {ApiCreatedResponse} from "@nestjs/swagger";
import {SongInput} from "./song.input";
import {Song} from "./song.entity";
import {User} from "../users/user.entity";
import * as fs from "fs";
import {UserInput} from "../users/user.input";

@Controller('Song')
export class SongController {

    constructor(private service: SongService) {
    }

    private nogi = 0;
    private saku = 0;
    private hina = 0;
    private keya = 0;
    private cross = 0;

    @Post()
    @ApiCreatedResponse({
        description: 'The song has been successfully created.'
    })
    public async create(@Body() input: SongInput): Promise<Song> {
        return this.service.create(input.link, input.start, input.end, input.name, input.group);
    }

    @Get()
    @ApiCreatedResponse({
        description: 'Songs have been successfully returned'
    })
    async getAllSongs(): Promise<Song[]> {
        return await this.service.getAllSongs();
    }


    @Get(':id')
    @ApiCreatedResponse({
        description: 'Song has been successfully returned'
    })
    async getById(@Param() parameter): Promise<Song> {
        const a = this.service.getById(parameter.id);
        if (a != undefined) {
            return a;
        } else {
            throw new HttpException(
                `Could not find a song with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Post('load')
    @ApiCreatedResponse({
        description: 'Song has been successfully returned'
    })
    async load(@Param() parameter): Promise<void> {
        let filePath="../dataent.txt"
        this.nogi=this.hina=this.keya=this.saku=this.cross=0;
        this.service.clear();
        let k = 0;
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Erreur de lecture du fichier :', err);
                return;
            }
            const lines: string[] = data.split('\n');
            const delay = 3; // délai en millisecondes

            const addDataWithDelay = async (dataArray: string[]) => {
                return new Promise<void>((resolve) => {
                    setTimeout(() => {
                        if (dataArray.length > 0) {
                            dataArray[0] = dataArray[0].replace('watch?v=', 'embed/');
                        }
                        if (dataArray.length > 0) {
                            dataArray[3] = dataArray[3].replace(/\r/g, '');
                        }

                        if(dataArray[4].trim()==="Nogizaka46"){
                            this.nogi+=1;
                        } else if(dataArray[4].trim()==="Sakurazaka46"){
                            this.saku+=1;
                        } else if(dataArray[4].trim()==="Hinatazaka46"){
                            this.hina+=1;
                        } else if(dataArray[4].trim()==="Keyakizaka46"){
                            this.keya+=1;
                        } else{
                            console.log(dataArray[4].trim())
                            this.cross+=1;
                        }
                        console.log(this.nogi+' '+this.hina+' '+this.saku+' '+this.keya+' '+this.cross);

                        this.service.create(dataArray[0], parseInt(dataArray[1]), parseInt(dataArray[2]), dataArray[3], dataArray[4]);
                        resolve();
                    }, delay);
                });


            };

            const processLines = async () => {
                for (const line of lines) {
                    const dataArray: string[] = line.split('|');
                    console.log(dataArray);
                    await addDataWithDelay(dataArray);
                }
            };

            processLines();
        });

    }





    @Put('roll')
    @ApiCreatedResponse({
        description: 'Song has been successfully returned'
    })
    async Roll(): Promise<Song> {
        let r = Math.floor(Math.random() *
            (await this.service.getMaxId() - await this.service.getSmallestId()+1) + await this.service.getSmallestId())
         const a = await this.service.getById(r);
        console.log("roll" + a);
        return a;
    }

    @Put('roll/:arg')
    @ApiCreatedResponse({
        description: 'Song has been successfully returned'
    })
    async Roll2(@Param() parameter): Promise<Song> {
        let minId: number, maxId: number,minId2: number, maxId2: number, weight: number, weight2: number;

        switch (parseInt(parameter.arg)) {
            case 1:
                minId = await this.service.getSmallestId();
                maxId = minId + this.nogi - 1;
                minId2 = 0;
                maxId2 = 0;
                weight = 1;
                weight2 = 0
                console.log("nogi");
                break;
            case 10:
                minId = await this.service.getSmallestId() + this.nogi;
                maxId = minId + this.saku - 1;
                minId2 = 0;
                maxId2 = 0;
                weight = 1;
                weight2 = 0
                console.log("saku");
                break;
            case 11:
                minId = await this.service.getSmallestId();
                maxId = minId + this.nogi + this.saku- 1;
                minId2 = 0;
                maxId2 = 0;
                weight = 1;
                weight2 = 0
                console.log("nogi + saku");
                break;
            case 100:
                minId = await this.service.getSmallestId() + this.nogi + this.saku;
                maxId = minId + this.hina - 1;
                minId2 = 0;
                maxId2 = 0;
                weight = 1;
                weight2 = 0
                console.log("hina");
                break;
            case 101:
                minId = await this.service.getSmallestId() + this.nogi + this.saku;
                maxId = minId + this.hina - 1;
                minId2 = await this.service.getSmallestId();
                maxId2 = minId2 + this.nogi - 1;
                weight = this.hina/(this.hina+this.nogi);
                weight2 = this.nogi/(this.hina+this.nogi)
                console.log("hina + nogi");
                break;

            case 110:
                minId = await this.service.getSmallestId() + this.nogi;
                maxId = minId + this.saku + this.hina - 1;
                minId2 = 0;
                maxId2 = 0;
                weight = 1;
                weight2 = 0
                console.log("hina + saku");
                break;

            case 111:
                minId = await this.service.getSmallestId();
                maxId = minId + this.nogi + this.saku + this.hina - 1;
                minId2 = 0;
                maxId2 = 0;
                weight = 1;
                weight2 = 0
                console.log("hina + saku + nogi");
                break;

            case 1000:
                minId = await this.service.getSmallestId() + this.nogi + this.saku + this.hina;
                maxId = await this.service.getMaxId()-4;
                minId2 = 0;
                maxId2 = 0;
                weight = 1;
                weight2 = 0
                console.log("keya");
                break;

            case 1001:
                minId = await this.service.getSmallestId() + this.nogi + this.saku + this.hina;
                maxId = minId + this.keya - 1;
                minId2 = await this.service.getSmallestId();
                maxId2 = await this.service.getMaxId()-4;
                weight = this.keya/(this.keya+this.nogi);
                weight2 = this.nogi/(this.keya+this.nogi)
                console.log("keya + nogi");
                break;

            case 1010:
                minId = await this.service.getSmallestId() + this.nogi + this.saku + this.hina;
                maxId = minId + this.keya - 1;
                minId2 = await this.service.getSmallestId() + this.nogi;
                maxId2 = await this.service.getMaxId()-4;
                weight = this.keya/(this.keya+this.saku);
                weight2 = this.saku/(this.keya+this.saku)
                console.log("keya + saku");
                break;

            case 1011:
                minId = await this.service.getSmallestId() + this.nogi + this.saku + this.hina;
                maxId = minId + this.keya - 1;
                minId2 = await this.service.getSmallestId();
                maxId2 = await this.service.getMaxId()-4;
                weight = this.keya/(this.keya+this.saku+this.nogi);
                weight2 = (this.saku+this.nogi)/(this.keya+this.saku+this.nogi)
                console.log("keya + saku + nogi");
                break;

            case 1100:
                minId = await this.service.getSmallestId() + this.nogi + this.saku;
                maxId = await this.service.getMaxId()-4;
                minId2 = 0;
                maxId2 = 0;
                weight = 1;
                weight2 = 0
                console.log("keya + hina");
                break;

            case 1101:
                minId = await this.service.getSmallestId() + this.nogi + this.saku;
                maxId = minId + this.hina + this.keya - 1;
                minId2 = await this.service.getSmallestId();
                maxId2 = await this.service.getMaxId()-4;
                weight = (this.keya+this.hina)/(this.keya+this.hina+this.nogi);
                weight2 = (this.nogi)/(this.keya+this.hina+this.nogi)
                console.log("keya + hina + nogi");
                break;

            case 1111:
                minId = await this.service.getSmallestId();
                maxId = await this.service.getMaxId();
                minId2 = 0;
                maxId2 = 0;
                weight = 1;
                weight2 = 0
                console.log("crossover on");
                break;

            default:
                minId = await this.service.getSmallestId();
                maxId = await this.service.getMaxId()-4;
                minId2 = 0
                maxId2 = 0
                weight = 1
                weight2 = 0
                console.log("crossover off");
                break;
        }

        let r = Math.floor(Math.random() * (maxId - minId + 1) + minId);
        let r2 = Math.floor(Math.random() * (maxId2 - minId2 + 1) + minId2);
        let r3 = Math.random();
        if(r3<=weight){
            const a = await this.service.getById(r);
            console.log(r3+" "+ a + r+ " r "+ minId + " " + maxId);
            return a;
        } else{
            const a = await this.service.getById(r2);
            console.log(r3+" "+ a + r2+ " r2 "+ minId2 + " " + maxId2);
            return a;
        }

    }

}
