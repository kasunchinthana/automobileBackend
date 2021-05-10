import { Process, Processor } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Job } from "bull";
import { AppGateway } from "./app.gateway";
const socketClusterClient = require('socketcluster-client');
const http = require('http');
// const socketClusterServer = require('socketcluster-server');
// let httpServer = http.createServer();
// let agServer = socketClusterServer.attach(httpServer);

const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

@Injectable()
@Processor('downloadCsv')
export class VehicleCsvConsumer {
    socket : any;
    private readonly logger = new Logger(VehicleCsvConsumer.name);
    
    constructor(private eventsGateway: AppGateway) {
        this.socket = socketClusterClient.create({
            hostname: 'localhost',
            port: 8000
          });
     }

    @Process('downloadCsv')
    async handleTranscode(job: Job) {
        const json2csvParser = new Json2csvParser({ header: true });
        const csv = json2csvParser.parse(job.data.file);
        fs.writeFile("age_of_vehice.csv", csv, function (error) {
            if (error) throw error;
            console.log(error);
        });
        this.socket.invoke('login', {username: 'bob'}),
        //return job.data.allVehicles.nodes
       // let socket = agServer.listener('connection');
        // console.log("socket");
        // let sss = socketClusterClient.connect();
        // sss.on('connect',()=>{
        //     console.log(sss);
        // })
        // let socket = socketClusterClient.create({
        //     hostname: 'localhost',
        //     port: 8000
        //   });
         // socket.transmit('foo', 123);
     // agServer.emit('pong', 'csv downloadede');

        // agServer.on('connection', function (socket) {
        //     console.log('PING', "ABCCC");
        //     socket.on('ping', function (data) {
        //       console.log('PING', data);
        //       agServer.exchange.publish('pong', 'csv downloaded');
        //     });
        //   });
       // this.socket.invoke('login', {username: 'bob'}),
        // for await (let rpc of socket.procedure('proc')) {
        //     rpc.end('success ' + rpc.data);
        // }
      
      //  console.log(socket);
        console.log("agserverrrrrrrrrrrrrrrrrrr");
        //console.log(agServer);
        return this.eventsGateway.sendToAll("csv downloaded");

      
    }

    
}