
import { Expose, Transform } from 'class-transformer';
import { IsInt } from 'class-validator';


export default class GetUserDto {
    @Expose()
    @IsInt()
    id: number;
}
