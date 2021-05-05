import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

describe('VehicleController', () => {
  let controller: VehicleController;

  const mockVehicleService = {
    getVehicleByAge:jest.fn(dto=>{
      return {
        firstname: "test"
      }
    })
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers:[VehicleService]
    }).overrideProvider(VehicleService).useValue(mockVehicleService).compile();

    controller = module.get<VehicleController>(VehicleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be get vehicleAge', () => {
    expect(controller.getVehicleByAge("35"))
  });
});
