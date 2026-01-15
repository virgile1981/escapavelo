import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Destination } from './entities/destination.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { DifficultyType, TravelType, Locale, Status, FlattenDestination, DestinationDTO } from '@escapavelo/shared-types';
import { DestinationTranslation } from './entities/destination-translation';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Destination)
    private tripsRepository: Repository<Destination>,
    @InjectRepository(DestinationTranslation)
    private translationsRepository: Repository<DestinationTranslation>,
  ) {
  }

  async getAllTrips(
    locale: Locale,
    withId?: boolean,
    allowEmptyTranslation: boolean = false,
    difficulty?: DifficultyType,
    travelType?: TravelType,
    promoted?: boolean,
    status?: Status,
    duration?: number
  ): Promise<Partial<FlattenDestination>[]> {

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

    const tripsValue = trips
      .filter(destination => allowEmptyTranslation || destination.translations[0])
      .map(destination => {

        const {
          createdAt, updatedAt,
          translations,
          ...destinationRest
        } = destination;

        if (!destination.translations || destination.translations.length <= 0) {
          return destinationRest
        }

        const { ...translationRest } = destination.translations[0]
        return {
          ...translationRest,
          ...destinationRest,

          id: withId ? destination.id : undefined,
        };
      });


    return tripsValue;

  }

  async getTripById(id: number): Promise<Destination> {
    const trip = await this.tripsRepository
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.translations', 't')
      .where('d.id = :id', { id })
      .getOne();

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
      .getOne();

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
      included: translation.included,
      notIncluded: translation.notIncluded,
      program: translation.program,
      longDescription: translation.longDescription,
      translations: undefined, // Optionnel : supprimer le tableau translations
    };
  }

  async createTrip(createTripDto: CreateTripDto): Promise<Destination> {
    const trip = this.tripsRepository.create(createTripDto);
    return this.tripsRepository.save(trip);
  }

  async updateTrip(id: number, updateTripDto: Partial<CreateTripDto>): Promise<Destination> {
    this.tripsRepository.save({ id, ...updateTripDto });
    return this.tripsRepository.findOneBy({ id });
  }

  async deleteTrip(id: number): Promise<void> {
    const result = await this.tripsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Voyage avec l'ID ${id} non trouvé`);
    }
  }
}