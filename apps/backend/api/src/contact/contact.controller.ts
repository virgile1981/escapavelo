import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { SubscribeToNewsletter } from './dto/create-subscriber.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Post('subscribe')
  async subscribe(@Body() newSubscriber: SubscribeToNewsletter): Promise<any> {
    console.log(newSubscriber)
    return this.contactService.subscribe(newSubscriber);
  }
}