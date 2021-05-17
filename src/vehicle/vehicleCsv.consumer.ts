import { OnQueueCompleted, Process, Processor } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Job } from "bull";
const socketClusterClient = require('socketcluster-client');

const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");
const socket = socketClusterClient.create({
    hostname: "localhost",
    port: 8000,
  });
@Injectable()
@Processor('downloadCsv')
export class VehicleCsvConsumer {
   // socket : any;
    private readonly logger = new Logger(VehicleCsvConsumer.name);
    
    constructor() {
        // this.socket = socketClusterClient.create({
        //     hostname: 'localhost',
        //     port: 8000
        //   });
     }

    @Process('downloadCsv')
    async handleTranscode(job: Job) {
        const json2csvParser = new Json2csvParser({ header: true });
        const csv = json2csvParser.parse(job.data.file);
        fs.writeFile("age_of_vehice.csv", csv, function (error) {
            if (error) throw error;
            console.log(error);
        });
        //this.socket.invoke('updateproc','vehicles'),
        
        console.log("agserverrrrrrrrrrrrrrrrrrr");
       
        //return this.eventsGateway.sendToAll("csv downloaded");

      
    }
    @OnQueueCompleted()
    onComplete(job: any) {
    //   this.logger.log(
    //     // 'Job id ' + job.id + ' is completed.. with user id: ' + job.data.file + " " + job.data.file
    //   );
      console.log("job.data.file");
      socket.invoke('updateProc',"job.data.file");
    }
    
}