import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './vehicle.entity';
import { VehicleResolver } from './vehicle.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([VehicleEntity])],
  controllers: [VehicleController],
  providers: [VehicleService,VehicleResolver]
})
export class VehicleModule {}
