import { Controller, Get, Post } from '@nestjs/common';
import { DbprocessService } from './dbprocess.service';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Controller('dbProcess')
export class DbprocessController {
    
    constructor(@InjectQueue('dbProcess') private readonly dbProcessQueue: Queue) {}

    
    @Post('transcode')
    async transcode() {
        const path = require('path')
        //const csv = require('fast-csv');
        //let notes = '/users/joe/notes.txt';
        
      await this.dbProcessQueue.add('transcode', {
        file: path.resolve('E:\Rapidassignmentdata.csv'),
      });
    }
    
}
