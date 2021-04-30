import { HttpModule, Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { VehicleResolver } from './vehicle.resolver';
import { BullModule } from '@nestjs/bull';
import { VehicleCsvConsumer } from './vehicleCsv.consumer';
import { AppGateway } from './app.gateway';

@Module({
  imports:[HttpModule,BullModule.registerQueue({
    name: 'downloadCsv'
  })],
  controllers: [VehicleController],
  providers: [VehicleService,VehicleResolver,VehicleCsvConsumer,AppGateway]
})
export class VehicleModule {}
