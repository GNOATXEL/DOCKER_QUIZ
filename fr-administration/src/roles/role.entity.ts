// 2entity.ts
import {User} from "../users/user.entity";
import {PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable, OneToMany, OneToOne,ManyToOne} from "typeorm";
import {Association} from "../associations/association.entity";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToOne(()=> User )
    public user: User;

    @ManyToOne(()=> Association)
    public association: Association;

    constructor(Rolename:string, user:User,association:Association) {
        this.name = Rolename;
        this.user = user;
        this.association = association;
    }

}
