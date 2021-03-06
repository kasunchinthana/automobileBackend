import { Resolver, Args, Query, Mutation } from '@nestjs/graphql'
import { VehicleService } from './vehicle.service';
import { VehicleDTO } from './vehicle.dto';
import { request, gql } from 'graphql-request'

const endpoint = 'http://localhost:5000/graphql';
@Resolver('vehicle')
export class VehicleResolver{
    constructor(private vehicleService: VehicleService) {}  
   
    @Query()
    async vehicleById(@Args('id') id: number){
        return  await   this.vehicleService.vehicleById(id);
    };

    @Query()
    async allVehicles(@Args('carModel') carModel: string,
                    @Args('first') first: number,
                    @Args('after') after: string){
      return  await   this.vehicleService.allVehicles(carModel,first, after);
    }
    @Query()
    async vehicle(@Args('id') id: string) {
    return await this.vehicleService.read(id);
    }

    @Query()
    async getVehicleByAge(@Args('vehicleAge') vehicleAge: string) {
    return await this.vehicleService.getVehicleByAge(vehicleAge);
    }


    @Mutation()
    async createVehicle(@Args('firstName') firstName: string,
                        @Args('lastName') lastName : string,
                        @Args('carModel') carModel : string) {
        const data: VehicleDTO  = { firstName, lastName,carModel };
        return await this.vehicleService.create( data);
    }

    @Mutation()
    async updateVehicleById(@Args('id') id: number,
                        @Args('firstName') firstName: string, 
                        @Args('lastName') lastName : string,
                        @Args('carModel') carModel : string) {
        const data: VehicleDTO = {firstName, lastName,carModel}
        return await this.vehicleService.update(id, data);
    }

    @Mutation()
    async deleteVehicle(@Args('id') id: string) {
        return await this.vehicleService.destroy(id);
    }
}