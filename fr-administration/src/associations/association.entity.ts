import {User} from "../users/user.entity";
import {Column, Entity, ManyToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn, Repository} from "typeorm";


@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User)
    @JoinTable()
    public users: User[];

    @Column()
    public name: string;

    constructor(users : User[], name: string,) {

        this.users=users;
        this.name=name;
    }

}