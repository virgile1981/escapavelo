import { IsNotEmpty, IsNumber, IsString, IsOptional, IsArray, IsEnum, Min, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { Image } from '@root/common/dto/image.dto';
import { DifficultyType, Status, TravelType } from '@escapavelo/shared-types'

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
  difficulty: DifficultyType;

  @IsString()
  travelType: TravelType;

  @IsString()
  status: Status;

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
  @ValidateNested()
  @Type(() => Image)
  imageUrl: Image;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  @IsOptional()
  imageUrls: Image[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripTranslationDto)
  translations: CreateTripTranslationDto[];
}

export class CreateTripTranslationDto {
  @IsString()
  @IsNotEmpty()
  locale: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  longDescription: string;

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