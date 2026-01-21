import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripsModule } from './trips/trips.module';
import { BlogModule } from './blog/blog.module';
import { Destination } from './trips/entities/destination.entity';
import { BlogPost } from './blog/entities/blog.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Subscribers } from './contact/entities/subscriber.entity';
import { User } from './auth/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { DestinationTranslation } from './trips/entities/destination-translation';
import { LoggingMiddleware } from './logging.middleware';
import { UploadModule } from './upload/upload.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mariadb',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT', 3306),
          username: configService.get<string>('DB_USERNAME', 'root'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [Destination, DestinationTranslation, BlogPost, Subscribers, User],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE', true), // Désactiver en prod
          logging: true
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
    CacheModule.register(),
    TripsModule,
    BlogModule,
    ContactModule,
    AuthModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // log toutes les routes
  }
}