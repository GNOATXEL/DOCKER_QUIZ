// 2entity.ts
import {PrimaryGeneratedColumn, Column, Entity} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public lastname: string;

    @Column()
    public firstname: string;

    @Column()
    public age: number;

    @Column()
    public password: string;

    constructor(lastname: string, firstname: string, age:number, password:string) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.age=age;
        this.password=password;
    }

}
