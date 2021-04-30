import { Process, Processor } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Job } from "bull";
import { AppGateway } from "./app.gateway";
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

@Injectable()
@Processor('downloadCsv')
export class VehicleCsvConsumer {
    private readonly logger = new Logger(VehicleCsvConsumer.name);
    
    constructor(private eventsGateway: AppGateway) { }

    @Process('downloadCsv')
    async handleTranscode(job: Job) {
        const json2csvParser = new Json2csvParser({ header: true });
        const csv = json2csvParser.parse(job.data.file);
        fs.writeFile("age_of_vehice.csv", csv, function (error) {
            if (error) throw error;
            console.log(error);
        });
        //return job.data.allVehicles.nodes
        return this.eventsGateway.sendToAll("alertToClient");
    }
}