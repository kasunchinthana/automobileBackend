import { Injectable, HttpException, HttpStatus, HttpService, UseInterceptors } from '@nestjs/common';
import { VehicleDTO } from './vehicle.dto';

import { request, gql } from 'graphql-request'
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
const endpoint = 'http://localhost:5000/graphql';

@Injectable()
export class VehicleService {
  constructor(private httpService: HttpService, @InjectQueue('downloadCsv') private csvDownloadQueue: Queue) { }

  async allVehicles(carModel, first, after) {
    const query = gql`{
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
    let output = await request(endpoint, query)
    return output.allVehicles;
  };

  async vehicleById(id) {
    const query = gql`query{
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
    let output = await request(endpoint, query)
    return output.vehicleById;
  }

  async create(data: VehicleDTO) {
    return this.httpService.get(endpoint);
  }

  async read(id: string) {
    return this.httpService.get(endpoint);

  }

  async getVehicleByAge(vehicleAge: string) {
    const query = gql`query vehicleQuery{
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
    let output = await request(endpoint, query)
    const job = await this.csvDownloadQueue.add('downloadCsv',
      {
        file: output.allVehicles.nodes
      });
    // return output.allVehicles.nodes;
  }

  async update(id: number, data: Partial<VehicleDTO>) {
    const query = gql`mutation updateVehicleById{
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
    let output = await request(endpoint, query)
    return output.updateVehicleById.vehicle;
  }

  async destroy(id: string) {
    const query = gql`mutation deleteVehicle{
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
    let output = await request(endpoint, query)
    return output.deleteVehicleById.vehicle;
  }
}
