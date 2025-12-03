import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Image } from '@root/common/dto/image.dto';
import { DifficultyType, Status, TravelType } from '@escapavelo/shared-types';
import { DefaultEntity } from '@root/shared/entity/default.entity';
import { DestinationTranslation } from './destination-translation';
@Entity()
export class Destination extends DefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  promoted: boolean;

  @Column({ type: 'varchar' })
  difficulty: DifficultyType;

  @Column({ type: 'varchar' })
  travelType: TravelType;

  @Column()
  duration: number;

  @Column()
  price: number;

  @Column()
  distance: number;

  @Column({ default: 'draft', type: 'varchar' })
  status: Status;

  @Column('simple-json', { nullable: true })
  imageUrl: Image;

  @Column('simple-json', { nullable: true })
  imageUrls: Image[];

  @OneToMany(() => DestinationTranslation, t => t.destination, { cascade: true })
  translations: DestinationTranslation[];
}
