import { DefaultEntity } from "@root/shared/entity/default.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Destination } from "./destination.entity";

@Entity()
export class DestinationTranslation extends DefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
  locale: string;

  @Column('simple-json', { nullable: true })
  included: string[];

  @Column('simple-json', { nullable: true })
  notIncluded: string[];

  @Column('simple-json', { nullable: true })
  program: { day: number; title: string; description: string; distance: number; accommodation?: string }[];

  @ManyToOne(() => Destination, d => d.translations, { onDelete: 'CASCADE' })
  destination: Destination;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}