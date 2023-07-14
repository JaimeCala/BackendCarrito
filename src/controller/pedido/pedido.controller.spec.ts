import { Test, TestingModule } from '@nestjs/testing';
import { PedidoController } from './pedido.controller';
import { Pedido } from '../../modules/pedido/pedido.entity';
import { PedidoService } from '../../service/pedido/pedido.service';

describe('CategoriaController', () => {
  let controller: PedidoController;
  let categoria  : Pedido ;
  
 const mockPedidoService ={
    create: jest.fn(dto =>{
      

      return {
        id: Date.now(),
        ...dto,
        //nombre: 'alimento',
        //estado: 'activo',
        
      };
    }),
  /*  update: jest.fn().mockImplementation((id,dto => {
      id,
      ...dto,
    
    })),*/
    

  

}; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoController],
      providers: [PedidoService],
    })
        .overrideProvider(PedidoService)
        .useValue(mockPedidoService)
        .compile();

    controller = module.get<PedidoController>(PedidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', () => {
  
    const dto = {nombre: 'alimento', estado:'activo'};

    expect( controller.createPedido(dto)).toEqual({
     id: expect.any(Number),
      ...dto,
  
    });
    expect(mockPedidoService.create).toHaveBeenCalledWith(dto);
  });

  it('update',);

});