import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class Image {
  @IsString()
  @IsNotEmpty()
  url: string;
  
  @IsString()
  @IsNotEmpty()
  resizedUrl: string;
  
  @IsString()
  @IsOptional()
  description: string;
}