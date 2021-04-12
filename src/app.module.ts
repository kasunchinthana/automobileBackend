import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { HttpErrorFilter } from './utils/http-error.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './utils/logging.intercepter';
import { DbprocessModule } from './dbprocess/dbprocess.module';
import { BullModule } from '@nestjs/bull';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [GraphQLModule.forRoot({
    typePaths:['./**/*.graphql']
  }), BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),VehicleModule, DbprocessModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_FILTER,
    useClass:HttpErrorFilter
  },{
    provide:APP_INTERCEPTOR,
    useClass:LoggingInterceptor
  }],
  
})
export class AppModule {


}
