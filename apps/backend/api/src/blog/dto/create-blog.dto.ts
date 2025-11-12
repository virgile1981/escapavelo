import { IsNotEmpty, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Image } from '@root/common/dto/image.dto';
import { Type } from 'class-transformer';
import { Status } from '@escapavelo/shared-types';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  slug: string

  @IsString()
  @IsOptional()
  excerpt: string;

   @IsOptional()
   @ValidateNested()
   @Type(() => Image)
  imageUrl: Image;

  @IsString()
  @IsOptional()
  status?: Status;
}