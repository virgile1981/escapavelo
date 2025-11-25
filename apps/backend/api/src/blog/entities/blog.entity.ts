import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { Image } from '@root/common/dto/image.dto';
import { Status } from '@escapavelo/shared-types';
import { DefaultEntity } from '@root/shared/entity/default.entity';
@Entity()
export class BlogPost extends DefaultEntity   {
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

  @Column({ default: 'draft', type: 'varchar' })
  status: Status;
}