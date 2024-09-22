import { Expose } from "class-transformer";
import { IsInt} from "class-validator";

export class DeleteUserDto {
    @Expose()
    @IsInt()
    id: number;
}