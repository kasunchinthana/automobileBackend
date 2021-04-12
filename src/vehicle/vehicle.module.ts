import { HttpModule, Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { VehicleResolver } from './vehicle.resolver';

@Module({
  imports:[HttpModule],
  controllers: [VehicleController],
  providers: [VehicleService,VehicleResolver]
})
export class VehicleModule {}
