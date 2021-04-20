import { Injectable, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleDTO } from './vehicle.dto';

import { request, gql } from 'graphql-request'
const endpoint = 'http://localhost:5000/graphql';
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

@Injectable()
export class VehicleService {
   constructor(private httpService: HttpService) {} 

    async allVehicles(carModel){ 
        const  query = gql `query{
            allVehicles (filter: {
             carModel: { startsWith:"${carModel}" }
                }){
                nodes{
                    nodeId
                    id
                    firstName
                    lastName
                    email
                    carMake
                    carModel
                    vinNumber
                    manufacturedDate
                    ageOfVehicle
                }           
            }
        }`;
        console.log(endpoint);
        console.log(query);
        
        let output = await request(endpoint,query)
        //.then((data)=>{
        console.log("output ",output.allVehicles.nodes);

        return output.allVehicles.nodes;
              
    };
          
    async vehicleById(id){
        const  query = gql `query{
             vehicleById(id:"${id}") {
                nodeId
               id
               firstName
               lastName
               email
               carMake
               carModel
               vinNumber
               manufacturedDate
               ageOfVehicle
         }
        }`;
        console.log(endpoint);
        console.log(query);
        
        let output = await request(endpoint,query)
        //.then((data)=>{
        console.log("output ",output.vehicleById);

        return output.vehicleById;
    }

    async create(data: VehicleDTO ){
        return this.httpService.get('http://localhost:5000/graphiql');
    }

    async read(id: string){
        return this.httpService.get('http://localhost:5000/graphiql');
        // const vehicle = await this.vehicleRepository.findOne({where :{id}});

        // if (!vehicle) {
        //     throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        // }

       // return vehicle;
    }

    async readVehicleByModel(car_model: string) {
        const  query = gql `query vehicleQuery{
            allVehicles(filter: {
              ageOfVehicle: {  greaterThan :"${car_model}"}
            }){
              nodes {
                nodeId
                id
                firstName
                lastName
                email
                carMake
                carModel
                vinNumber
                manufacturedDate
                ageOfVehicle
              }
            }
          }`;
          
        let output = await request(endpoint,query)
      //  console.log(output);
        const json2csvParser = new Json2csvParser({ header: true});
        const csv = json2csvParser.parse(output.allVehicles.nodes);
      //  console.log("ddddd!");
        fs.writeFile("age_of_vehice.csv", csv, function(error) {
        if (error) throw error;
            console.log("age_of_vehices.csv successfully!");
        });
        return output.allVehicles.nodes;
    }

    async update(id:number,data :Partial<VehicleDTO>){
       
        const  query = gql `mutation updateVehicleById{
            updateVehicleById (input:{
                id:${id},vehiclePatch:{firstName:"${data.firstName}"}
                }){
                    vehicle{
                    nodeId
                    id
                    firstName
                    lastName
                    email
                    carMake
                    carModel
                    vinNumber
                    manufacturedDate
                    ageOfVehicle
                    }
                    
                }          
            
            }`;
         console.log(endpoint);
         console.log(query);
        let output = await request(endpoint,query)
       
        console.log("output ",output);
        return output.updateVehicleById.vehicle;
    }

    async destroy(id:string){
        return this.httpService.get('http://localhost:5000/graphiql');
        // const vehicle = await this.vehicleRepository.findOne({where :{id}});
        // if (!vehicle) {
        //     throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        // }
        // await this.vehicleRepository.delete({id})
        // return {deleted:true};
    }
}
