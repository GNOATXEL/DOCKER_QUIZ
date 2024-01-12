// 2entity.ts
import {PrimaryGeneratedColumn, Column, Entity} from "typeorm";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public link: string;

    @Column()
    public start: number;

    @Column()
    public end: number;

    @Column()
    public name: string;

    @Column()
    public group: string;

    constructor(link: string, start: number, end:number, name:string, group:string) {
        this.link = link;
        this.start = start;
        this.end=end;
        this.name=name;
        this.group=group;
    }

}
