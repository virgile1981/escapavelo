import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { SubscribeToNewsletter } from './dto/create-subscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscribers } from './entities/subscriber.entity';

@Injectable()
export class ContactService {

  constructor(private mailerService: MailerService,   @InjectRepository(Subscribers) private subscriberRepository: Repository<Subscribers>) {}

  async create(createContactDto: CreateContactDto) {
 try {

    console.log("infos pour l'envoi d'email", createContactDto)
    await this.mailerService.sendMail({
        from: createContactDto.email,
        to: "contact@escapavelo.fr",
        subject: createContactDto.name,
        text: createContactDto.message
      });
    return {
      success: true,
      message: 'Message reçu avec succès',
    };
  }catch(error) {
      console.error('Erreur lors de l’envoi de l’email :', error);
        return { success: false, message: 'Impossible d’envoyer l’email. Veuillez réessayer plus tard.' };
  }
  }


  async subscribe(newSubscriber: SubscribeToNewsletter) {
    try {
       const post = this.subscriberRepository.create(newSubscriber);
      return this.subscriberRepository.save(post);
    } catch(error) {
      console.error('Erreur lors de l’ajout de l’email en base :', error);
      return { success: false, message: 'Impossible d’enregistrer l’email' };
    }
  }
}