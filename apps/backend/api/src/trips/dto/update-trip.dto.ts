import { IsNumber, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create-trip.dto';

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @IsNumber()
  @Min(1)
  id: number;
}