import {IsString} from 'class-validator';


export class VehicleDTO{

    @IsString()
    first_name :string;
    @IsString()
    last_name :string;
    @IsString() 
    car_model: string;
}