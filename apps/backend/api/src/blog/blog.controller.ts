import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogPost } from './entities/blog.entity';
import { JwtAuthGuard } from '@root/auth/jwt-auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll(@Query('status') status: 'draft' | 'published' ): Promise<BlogPost[]> {
    return this.blogService.findAll(status);
  }

  @Get('latest')
  findLatest(@Query('limit') limit: number): Promise<BlogPost[]> {
    return this.blogService.findLatest(limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BlogPost> {
    return this.blogService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBlogDto: CreateBlogDto): Promise<BlogPost> {
    return this.blogService.create(createBlogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: Partial<CreateBlogDto>): Promise<BlogPost> {
    return this.blogService.update(+id, updateBlogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.blogService.remove(+id);
  }
}