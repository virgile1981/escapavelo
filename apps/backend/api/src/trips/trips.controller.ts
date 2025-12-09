import { Controller, Get, Param, Query } from '@nestjs/common';
import { TripsService } from './trips.service';
import { Destination } from './entities/destination.entity';
import { DifficultyType, FlattenDestination, Locale, Status, TravelType } from '@escapavelo/shared-types';

@Controller(':locale/trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) { }

  @Get()
  getAllTrips(
    @Param('locale') locale: Locale,
    @Query('with_id') withId?: boolean,
    @Query('allowEmptyTranslation') allowEmptyTranslation?: boolean,
    @Query('difficulty') difficulty?: DifficultyType,
    @Query('travelType') travelType?: TravelType,
    @Query('status') status?: Status,
    @Query('duration') duration?: number,
    @Query('promoted') promoted?: boolean,
  ): Promise<FlattenDestination[]> {
    return this.tripsService.getAllTrips(
      locale,
      withId,
      allowEmptyTranslation,
      difficulty,
      travelType,
      promoted,
      status,
      duration ? +duration : undefined
    );
  }

  @Get(':slug')
  getTripBySlug(@Param('locale') locale: Locale, @Param('slug') slug: string): Promise<Destination> {
    return this.tripsService.getTripBySlug(locale, slug);
  }

}