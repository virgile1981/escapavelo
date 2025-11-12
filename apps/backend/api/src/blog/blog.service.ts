import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Status } from '@escapavelo/shared-types';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private blogRepository: Repository<BlogPost>,
  ) {
  }


  async findAll(status: Status): Promise<BlogPost[]> {
    return this.blogRepository.find({
      where: status ? { status } : {},
      order: { createdAt: 'DESC' }
    });
  }

  async findLatest(limit: number = 3): Promise<BlogPost[]> {
    return this.blogRepository.find({
      where: { status: 'published' },
      order: { createdAt: 'DESC' },
      take: limit
    });
  }

  async findOne(id: number): Promise<BlogPost> {
    return this.blogRepository.findOneBy({ id });
  }

  async create(createBlogDto: CreateBlogDto): Promise<BlogPost> {
    const post = this.blogRepository.create(createBlogDto);
    return this.blogRepository.save(post);
  }

  async update(id: number, updateBlogDto: Partial<CreateBlogDto>): Promise<BlogPost> {
    await this.blogRepository.update(id, updateBlogDto);
    return this.blogRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.blogRepository.delete(id);
  }
}