import { Test, TestingModule } from '@nestjs/testing';
import { ProveedorController } from './proveedor.controller';
import { Proveedor } from '../../modules/proveedor/proveedor.entity';
import { ProveedorService } from '../../service/proveedor/proveedor.service';

describe('CategoriaController', () => {
  let controller: ProveedorController;
  let categoria  : Proveedor ;
  
 const mockProveedorService ={
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
      controllers: [ProveedorController],
      providers: [ProveedorService],
    })
        .overrideProvider(ProveedorService)
        .useValue(mockProveedorService)
        .compile();

    controller = module.get<ProveedorController>(ProveedorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', () => {
  
    const dto = {nombre: 'alimento', estado:'activo'};

    expect( controller.createProveedor(dto)).toEqual({
     id: expect.any(Number),
      ...dto,
  
    });
    expect(mockProveedorService.create).toHaveBeenCalledWith(dto);
  });

  it('update',);

});