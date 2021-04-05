import { Resolver, Args, Query, Mutation } from '@nestjs/graphql'
import { VehicleService } from './vehicle.service';
import { VehicleDTO } from './vehicle.dto';

@Resolver('vehicle')
export class VehicleResolver{
    constructor(private vehicleService: VehicleService) {}    
    @Query()
    async vehicles(@Args('page') page: number,@Args('newest') newest: boolean){
      return  await   this.vehicleService.showAllVeicles(page,newest);
    }
    @Query()
    async vehicle(@Args('id') id: string) {
    return await this.vehicleService.read(id);
    }

    @Query()
    async vehicleByModel(@Args('carModel') car_model: string) {
    return await this.vehicleService.readVehicleByModel(car_model);
    }

    @Mutation()
    async createVehicle(@Args('first_name') first_name: string,
                        @Args('last_name') last_name : string,
                        @Args('car_model') car_model : string) {
        const data: VehicleDTO  = { first_name, last_name,car_model };
        return await this.vehicleService.create( data);
    }

    @Mutation()
    async updateVehicle(@Args('id') id: number,
                        @Args('first_name') first_name: string, 
                        @Args('last_name') last_name : string,
                        @Args('car_model') car_model : string) {
        const data: VehicleDTO = {first_name, last_name,car_model}
        return await this.vehicleService.update(id, data);
    }

    @Mutation()
    async deleteVehicle(@Args('id') id: number) {
        return await this.vehicleService.destroy(id);
    }
}