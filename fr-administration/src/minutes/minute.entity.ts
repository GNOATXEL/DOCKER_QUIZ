// 2entity.ts
import {User} from "../users/user.entity";
import {PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable, OneToMany, OneToOne,ManyToOne} from "typeorm";
import {Association} from "../associations/association.entity";

@Entity()
export class Minute {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    content: string;

    @ManyToMany(()=> User,{ eager: true } )
    @JoinTable()
    idVoters: number[];

    @Column()
    date: string;

    @Column()
    idAssociation: number;

    constructor(content: string, idVoters: number[], date: string, idAssociation: number) {
        this.content = content;
        this.idVoters = idVoters;
        this.date = date;
        this.idAssociation = idAssociation;
    }
}
