import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { DifficultyType, TravelType } from '@escapavelo/shared-types';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>,
  ) {
  }
  async getAllTrips(difficulty?: DifficultyType, travelType?: TravelType, promoted? :boolean, duration?: number): Promise<Trip[]> {
    const query: any = {};
    
    if (difficulty !== undefined) {
      query.difficulty = difficulty;
    }
    
    if (travelType) {
      query.travelType = travelType;
    }
    
    if(promoted) {
      query.promoted = promoted;
    }

    if (duration !== undefined) {
      // Filtrer par durée avec une marge de +/- 2 jours
      const minDuration = duration - 2;
      const maxDuration = duration + 2;
      return this.tripsRepository.find({
        where: {
          ...query,
          duration: Between(minDuration > 0 ? minDuration : 1, maxDuration)
        }
      });
    }
    
    return this.tripsRepository.find({ where: query, select: ['id', 'title', 'slug', 'imageUrl','description','price','difficulty','duration','region','travelType'] });
  }

  async getTripById(id: number): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({ where: { id } });
    if (!trip) {
      throw new NotFoundException(`Voyage avec l'ID ${id} non trouvé`);
    }
    return trip;
  }

  async getTripBySlug(slug: string): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({ where: { slug }  });
    if (!trip) {
      throw new NotFoundException(`Voyage avec l'ID ${slug} non trouvé`);
    }
    return trip;
  }


  async createTrip(createTripDto: CreateTripDto): Promise<Trip> {
    const trip = this.tripsRepository.create(createTripDto);
    return this.tripsRepository.save(trip);
  }
 
  async updateTrip(id: number, updateTripDto: Partial<CreateTripDto>): Promise<Trip> {
    this.tripsRepository.update(id,updateTripDto);
    return this.tripsRepository.findOneBy({id});
  }

  async deleteTrip(id: number): Promise<void> {
    const result = await this.tripsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Voyage avec l'ID ${id} non trouvé`);
    }
  }
}