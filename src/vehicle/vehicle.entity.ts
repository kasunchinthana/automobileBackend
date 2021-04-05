import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity('vehicle') 
export class VehicleEntity{
//age_of_vehicle
    @PrimaryGeneratedColumn() 
    id: number;

    @Column() 
    first_name: string;

    @Column() 
    last_name: string;

    @Column() 
    email: string;

    @Column() 
    car_make: string;

    @Column() 
    car_model: string;

    @Column() 
    vin_number: string;

    @Column() 
    manufactured_date: Date;

    @Column()
    age_of_vehicle: string;

}