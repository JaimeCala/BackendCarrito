import { Test, TestingModule } from '@nestjs/testing';
import { ReclamoController } from './reclamo.controller';

describe('Reclamo Controller', () => {
  let controller: ReclamoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReclamoController],
    }).compile();

    controller = module.get<ReclamoController>(ReclamoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
