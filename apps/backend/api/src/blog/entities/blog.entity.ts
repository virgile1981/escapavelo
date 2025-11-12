import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Image } from '@root/common/dto/image.dto';
import { Status } from '@escapavelo/shared-types';
@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  slug: string;

  @Column()
  excerpt: string;
  
  @Column('simple-json', {nullable: true})
  imageUrl: Image;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 'draft' })
  status: Status;
}