import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { Destination } from './entities/destination.entity';
import { TripsAdminController } from './trips-admin.controller';
import { DestinationTranslation } from './entities/destination-translation';

@Module({
  imports: [TypeOrmModule.forFeature([Destination, DestinationTranslation])],
  controllers: [TripsController, TripsAdminController],
  providers: [TripsService],
})
export class TripsModule { }