import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { HttpErrorFilter } from './utils/http-error.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './utils/logging.intercepter';
import { BullModule } from '@nestjs/bull';
import { GraphQLModule } from '@nestjs/graphql';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql']
  }), BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }), VehicleModule, SocketModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: HttpErrorFilter
  }, {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }],
})
export class AppModule { }
