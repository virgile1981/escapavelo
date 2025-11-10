import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { JwtAuthGuard } from '@root/auth/jwt-auth.guard';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  getAllTrips(
    @Query('difficulty') difficulty?: number,
    @Query('travelType') travelType?: 'family' | 'couple' | 'friends',
    @Query('duration') duration?: number,
    @Query('promoted') promoted?: boolean
  ): Promise<Trip[]> {
    return this.tripsService.getAllTrips(
      difficulty ? +difficulty : undefined,
      travelType,
      promoted,
      duration ? +duration : undefined
    );
  }

  @Get(':id')
  getTripById(@Param('id', ParseIntPipe) id: number): Promise<Trip> {
    return this.tripsService.getTripById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTrip(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripsService.createTrip(createTripDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateTrip(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ): Promise<Trip> {
    return this.tripsService.updateTrip(id, updateTripDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTrip(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tripsService.deleteTrip(id);
  }
}