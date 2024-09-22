import { Expose } from "class-transformer";
import { IsOptional, IsString} from "class-validator";

export class UpdateUserDto {
    @Expose()
    id: number;

    @IsOptional()
    @IsString()
    public name?: string;

    @IsOptional()
    @IsString()
    public password?: string;

    @IsOptional()
    @IsString()
    public email?: string;
}