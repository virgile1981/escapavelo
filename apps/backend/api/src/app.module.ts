import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripsModule } from './trips/trips.module';
import { BlogModule } from './blog/blog.module';
import { join } from 'path';
import { Trip } from './trips/entities/trip.entity';
import { BlogPost } from './blog/entities/blog.entity';
import { UploadController } from './upload/upload.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Subscribers } from './contact/entities/subscriber.entity';
import { User } from './auth/entities/user.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}` || '.env', // exemple : .env.production
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>  {
        return {
        type: 'mariadb',
        host: configService.get<string>('DB_URL', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'root'),
        password: configService.get<string>('DB_PASSWORD', 'root'),
        database: configService.get<string>('DB_NAME', 'cyclotopia'),
        entities: [join(__dirname, '**', '*.entity{.ts,.js}'), Trip, BlogPost,Subscribers, User],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', true), // Désactiver en prod
      } as TypeOrmModuleOptions
    },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'ssl0.ovh.net', 
        port: 587,
        secure: false, // true pour 465, false pour 587
        auth: {
          user: 'contact@escapavelo.fr',
          pass: '&Vb03831s@',
        },
      },
      defaults: {
        from: '"formulaire contact" <contact@escapavelo>',
      },
    }),
    TripsModule,
    BlogModule,
    ContactModule,
    AuthModule
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}