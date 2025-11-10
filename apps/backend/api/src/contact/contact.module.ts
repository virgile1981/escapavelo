import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribers } from './entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscribers])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}