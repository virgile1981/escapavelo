import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Destination } from './entities/destination.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { DifficultyType, TravelType, Locale, Status } from '@escapavelo/shared-types';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Destination)
    private tripsRepository: Repository<Destination>,
  ) {
  }
  async getAllTrips(
    locale: Locale,
    difficulty?: DifficultyType,
    travelType?: TravelType,
    promoted?: boolean,
    status?: Status,
    duration?: number
  ): Promise<Destination[]> {

    const qb = this.tripsRepository
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.translations', 't', 't.locale = :locale', { locale });

    // Construction dynamique des conditions
    if (difficulty !== undefined) {
      qb.andWhere('d.difficulty = :difficulty', { difficulty });
    }

    if (travelType) {
      qb.andWhere('d.travelType = :travelType', { travelType });
    }

    if (promoted !== undefined) {
      qb.andWhere('d.promoted = :promoted', { promoted });
    }

    if (status !== undefined) {
      qb.andWhere('d.status = :status', { status });
    }

    if (duration !== undefined) {
      const minDuration = Math.max(duration - 2, 1);
      const maxDuration = duration + 2;
      qb.andWhere('d.duration BETWEEN :min AND :max', { min: minDuration, max: maxDuration });
    }

    // Exécuter la requête
    const trips = await qb.getMany();

    // Aplatir les données de traduction
    return trips.map(trip => ({
      ...trip,
      locale: trip.translations?.[0]?.locale,
      region: trip.translations?.[0]?.region,
      title: trip.translations?.[0]?.title,
      slug: trip.translations?.[0]?.slug,
      description: trip.translations?.[0]?.description,
      // Supprimer le tableau translations si tu veux
      translations: undefined,
    }));
  }

  async getTripById(id: number): Promise<Destination> {
    const trip = await this.tripsRepository.findOne({ where: { id } });
    if (!trip) {
      throw new NotFoundException(`Voyage avec l'ID ${id} non trouvé`);
    }
    return trip;
  }

  async getTripBySlug(locale: Locale, slug: string): Promise<any> {
    const trip = await this.tripsRepository
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.translations', 't')
      .where('t.locale = :locale AND t.slug = :slug', { locale, slug })
      .getOne()

    console.log('Trip fetched by slug:', trip);
    if (!trip || !trip.translations?.length) {
      throw new NotFoundException(`Voyage avec le slug "${slug}" non trouvé`);
    }

    // Aplatir les données de traduction dans l'objet principal
    const translation = trip.translations[0];
    return {
      ...trip,
      locale: translation.locale,
      title: translation.title,
      slug: translation.slug,
      description: translation.description,
      longDescription: translation.longDescription,
      translations: undefined, // Optionnel : supprimer le tableau translations
    };
  }

  async createTrip(createTripDto: CreateTripDto): Promise<Destination> {
    const trip = this.tripsRepository.create(createTripDto);
    return this.tripsRepository.save(trip);
  }

  async updateTrip(id: number, updateTripDto: Partial<CreateTripDto>): Promise<Destination> {
    this.tripsRepository.update(id, updateTripDto);
    return this.tripsRepository.findOneBy({ id });
  }

  async deleteTrip(id: number): Promise<void> {
    const result = await this.tripsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Voyage avec l'ID ${id} non trouvé`);
    }
  }
}