import { Injectable, HttpException, HttpStatus, HttpService, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleDTO } from './vehicle.dto';

import { request, gql } from 'graphql-request'
import { AppGateway } from 'src/app.gateway';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { FileInterceptor } from '@nestjs/platform-express';
const endpoint = 'http://localhost:5000/graphql';
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");
const path = require('path')

@Injectable()
export class VehicleService {
   constructor(private httpService: HttpService,private appGateway: AppGateway,@InjectQueue('downloadCsv') private  csvDownloadQueue: Queue) {} 

    async allVehicles(carModel,first, after){ 
        const  query = gql `{
          allVehicles(first: ${first}, after:${after}
            , filter: {carModel: {startsWith: "${carModel}"}}) {
              pageInfo {
                hasNextPage
                endCursor
              }
              totalCount
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
          }
        `;
        console.log(endpoint);
        console.log(query);
        
        let output = await request(endpoint,query)
        
       //console.log("output ",output.allVehicles);

        return output.allVehicles;
              
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
   
        console.log("output ",output.vehicleById);

        return output.vehicleById;
    }

    async create(data: VehicleDTO ){
        return this.httpService.get('http://localhost:5000/graphiql');
    }

    async read(id: string){
        return this.httpService.get('http://localhost:5000/graphiql');
        
    }
    @UseInterceptors(FileInterceptor("file", { dest: "./uploads" }))
    async getVehicleByAge(vehicleAge: string) {
        const  query = gql `query vehicleQuery{
            allVehicles(filter: {
              ageOfVehicle: {  greaterThan :"${vehicleAge}"}
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
        this.appGateway.server.emit('emitmsg', 'get datan from db');
        const job = await this.csvDownloadQueue.add('downloadCsv',
        {
          file: output.allVehicles.nodes
        });
         this.appGateway.server.emit('age_of_vehice', 'get datan from db');
        
    }

    async update(id:number,data :Partial<VehicleDTO>){
       
        const  query = gql `mutation updateVehicleById{
            updateVehicleById (input:{
                id:"${id}",vehiclePatch:{firstName:"${data.firstName}"}
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
        const  query = gql`mutation deleteVehicle{
            deleteVehicleById(input:{ id: "${id}" }){
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
         return output.deleteVehicleById.vehicle;
    }
}
