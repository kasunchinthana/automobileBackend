import {IsString} from 'class-validator';


export class VehicleDTO{

    @IsString()
    firstName :string;
    @IsString()
    lastName :string;
    @IsString() 
    carModel: string;
}