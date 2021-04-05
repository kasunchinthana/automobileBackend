import { Test, TestingModule } from '@nestjs/testing';
import { DbprocessService } from './dbprocess.service';

describe('DbprocessService', () => {
  let service: DbprocessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbprocessService],
    }).compile();

    service = module.get<DbprocessService>(DbprocessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
