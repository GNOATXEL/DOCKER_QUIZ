import { ApiProperty } from "@nestjs/swagger";
import {Repository} from "typeorm";
import {User} from "../users/user.entity";

export class AssociationInput {

    @ApiProperty({
        description: 'All the id of the users in the association',
        example: "[1,2,3,4,5,6]",
        default: [],
        type: Array<number>,
    })
    public idUsers: number[];

    @ApiProperty({
        description: 'The name of the association',
        example: "Happiness Officer",
        default: "defaultname",
        type: String,
    })
    public name: string;


}