import { HttpModule, Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { VehicleResolver } from './vehicle.resolver';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports:[HttpModule],
  controllers: [VehicleController],
  providers: [VehicleService,VehicleResolver,AppGateway]
})
export class VehicleModule {}
