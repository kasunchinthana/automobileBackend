import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VehicleEntity } from './vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleDTO } from './vehicle.dto';

@Injectable()
export class VehicleService {
   
    constructor(@InjectRepository(VehicleEntity) 
    private vehicleRepository: Repository<VehicleEntity>){}

    async showAllVeicles(page: number = 1, newest?: boolean){
        return await this.vehicleRepository.find({take: 100,
            skip: 100 * (page - 1)});
    }

    async create(data: VehicleDTO ){
        const vehicle = await this.vehicleRepository.create(data);
        await this.vehicleRepository.save(vehicle);
        return vehicle;
    }

    async read(id: string){
        const vehicle = await this.vehicleRepository.findOne({where :{id}});

        if (!vehicle) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return vehicle;
    }

    async readVehicleByModel(car_model: string) {
        const vehicle = await this.vehicleRepository.findOne({where :{car_model}});

        if (!vehicle) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return vehicle;
    }

    async update(id:number,data :Partial<VehicleDTO>){
        let vehicle = await this.vehicleRepository.findOne({where :{id}});
        
        if (!vehicle) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        await this.vehicleRepository.update({ id },data);
        vehicle = await this.vehicleRepository.findOne({id});
        return vehicle;
    }

    async destroy(id:number){
        const vehicle = await this.vehicleRepository.findOne({where :{id}});
        if (!vehicle) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        await this.vehicleRepository.delete({id})
        return {deleted:true};
    }
}
