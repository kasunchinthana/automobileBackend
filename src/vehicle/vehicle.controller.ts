import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, Logger, Query } from '@nestjs/common';
import { UpdateDateColumn } from 'typeorm';
import { VehicleService } from './vehicle.service';
import { VehicleDTO } from './vehicle.dto';
import { pipe } from 'rxjs';
import { ValidationPipe } from 'src/utils/validation.pipe';

@Controller('vehicleapi')
export class VehicleController {
    private logger = new Logger('VehicleController');
    constructor(private vehicleServie:VehicleService){

    }
    private logData(options: any) {
        options.user && this.logger.log('USER ' + JSON.stringify(options.user));
        options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
        options.id && this.logger.log('IDEA ' + JSON.stringify(options.id));
      }

      
    @Get()
    showAllVeicles(@Query('page') page: number){
      //  return this.vehicleServie.showAllVeicles(page);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createVehicleAge(@Body() data:VehicleDTO){
        this.logData({ data });
        return this.vehicleServie.create(data);
    }

    @Get(':id')
    readVehicleAge(@Param('id') id:string){
        this.logData({ id });
        return this.vehicleServie.read(id);
    }

    @Get('carModel/:carModel')
    readVehicleByModel(@Param('carModel') carModel:string){
        this.logData({ carModel });
        return this.vehicleServie.readVehicleByModel(carModel);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateVehicleAge(@Param('id') id:number,@Body() data:Partial<VehicleDTO>){
        return this.vehicleServie.update(id,data);
    }

    @Delete(':id')
    removeVehicleAge(@Param('id') id:string){
        this.vehicleServie.destroy(id);
    }
    
}
