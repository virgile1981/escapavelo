import { IsNotEmpty, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Image } from '@root/common/dto/image.dto';
import { Type } from 'class-transformer';

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
   @ValidateNested({ each: true })
   @Type(() => Image)
  imageUrl: Image;

  @IsString()
  @IsOptional()
  status?: 'draft' | 'published';
}