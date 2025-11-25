import { DefaultEntity } from "@root/shared/entity/default.entity";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto extends DefaultEntity {
    
    @IsNotEmpty()
    @IsString()
    login: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
}