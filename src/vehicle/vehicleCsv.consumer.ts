import { Process, Processor } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Job } from "bull";
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");
const path = require('path')

@Injectable()
@Processor('downloadCsv')
export class VehicleCsvConsumer {
    private readonly logger = new Logger(VehicleCsvConsumer.name);
  
  @Process('downloadCsv')
  async handleTranscode(job: Job) {
    
    
  const json2csvParser = new Json2csvParser({ header: true});

    const csv = json2csvParser.parse(job.data);
    fs.writeFile("age_of_vehice.csv", csv, function(error) {
    if (error) throw error;
        console.log("age_of_vehices.csv successfully!");
    });
    return job.data.allVehicles.nodes
   
  
  }
}