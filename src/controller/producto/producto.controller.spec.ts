import { Test, TestingModule } from '@nestjs/testing';
import { ProductoController } from './producto.controller';
import { Producto } from '../../modules/producto/producto.entity';
import { ProductoService } from '../../service/producto/producto.service';

describe('CategoriaController', () => {
  let controller: ProductoController;
  let categoria  : Producto ;
  
 const mockProductoService ={
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
      controllers: [ProductoController],
      providers: [ProductoService],
    })
        .overrideProvider(ProductoService)
        .useValue(mockProductoService)
        .compile();

    controller = module.get<ProductoController>(ProductoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', () => {
  
    const dto = {nombre: 'alimento', estado:'activo'};

    expect( controller.createProducto(dto)).toEqual({
     id: expect.any(Number),
      ...dto,
  
    });
    expect(mockProductoService.create).toHaveBeenCalledWith(dto);
  });

  it('update',);

});