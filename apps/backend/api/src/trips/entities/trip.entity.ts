import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from '@root/common/dto/image.dto';
import { Status, TravelType } from '@escapavelo/shared-types';
@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  promoted: boolean; 

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  region: string;

  @Column()
  description: string;

  @Column('text')
  longDescription: string;

  @Column()
  difficulty: number;

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
  included: string[];

  @Column('simple-json', { nullable: true })
  notIncluded: string[];

  @Column('simple-json', { nullable: true })
  program: { day: number;  title: string; description: string; distance: number; accommodation?: string }[];

  @Column('simple-json', {nullable: true})
  imageUrl: Image;

  @Column('simple-json', {nullable: true})
  imageUrls: Image[];
}
