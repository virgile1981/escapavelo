import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { Destination } from './entities/destination.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { JwtAuthGuard } from '@root/auth/jwt-auth.guard';

@Controller('trips')
export class TripsAdminController {
    constructor(private readonly tripsService: TripsService) { }

    @Get(':id')
    getTripById(@Param('id', ParseIntPipe) id: number): Promise<Destination> {
        return this.tripsService.getTripById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createTrip(@Body() createTripDto: CreateTripDto): Promise<Destination> {
        return this.tripsService.createTrip(createTripDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateTrip(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTripDto: Partial<CreateTripDto>,
    ): Promise<Destination> {
        return this.tripsService.updateTrip(id, updateTripDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteTrip(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tripsService.deleteTrip(id);
    }
}