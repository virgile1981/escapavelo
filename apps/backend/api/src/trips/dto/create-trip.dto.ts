import { IsNotEmpty, IsNumber, IsString, IsOptional, IsArray, IsEnum, Min, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { Image } from '@root/common/dto/image.dto';
class DayTrip {
  @IsNumber()
  @Min(1)
  day: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  distance: number; 

  @IsString()
  @IsOptional()
  accommodation: string;

  @IsString()
  @IsOptional()
  title: string;
}

export class CreateTripDto {

  @IsBoolean()
  promoted: boolean;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  longDescription: string;

  @IsNumber()
  @Min(1)
  difficulty: number;

  @IsString()
  @IsEnum(['family', 'couple', 'friends'])
  travelType: 'family' | 'couple' | 'friends';

  @IsString()
  @IsEnum(['draft', 'published'])
  status: 'draft' | 'published';

  @IsNumber()
  @Min(1)
  duration: number;

  @IsNumber()
  @Min(1)
  distance: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Image)
  imageUrl: Image;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  @IsOptional()
  imageUrls: Image[];

  @IsString()
  @IsOptional()
  slug: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  included?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  notIncluded?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayTrip)
  @IsOptional()
  program?: DayTrip[];
}