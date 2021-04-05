import { Test, TestingModule } from '@nestjs/testing';
import { DbprocessController } from './dbprocess.controller';

describe('DbprocessController', () => {
  let controller: DbprocessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbprocessController],
    }).compile();

    controller = module.get<DbprocessController>(DbprocessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
