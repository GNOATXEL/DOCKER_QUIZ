import { ApiProperty } from "@nestjs/swagger";

export class SongInput {

    @ApiProperty({
        description: 'The link of the song',
        example: "httpmachin",
        type: String,
    })
    public link: string;

    @ApiProperty({
        description: 'The beginning of the song',
        example: "250",
        type: Number,
    })
    public start: number;

    @ApiProperty({
        description: 'The latest possible timestamp',
        type: Number,
    })
    public end: number;

    @ApiProperty({
        description: 'The name of the song',
        type: String,
    })
    public name: string;

    @ApiProperty({
        description: 'The group of the song',
        type: String,
    })
    public group: string;
}