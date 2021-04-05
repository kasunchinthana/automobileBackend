import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { DbprocessService } from './dbprocess.service';
import { DbprocessController } from './dbprocess.controller';
import { DbProcessProcessor } from './dbprocessor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'dbProcess',
    })
  ],
  providers: [DbProcessProcessor],
  controllers: [DbprocessController]
})
export class DbprocessModule {}
