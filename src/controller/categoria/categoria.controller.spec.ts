import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaService } from '../../service/categoria/categoria.service';
import { CategoriaController } from './categoria.controller';
import { Categoria } from '../../modules/categoria/categoria.entity';

describe('CategoriaController', () => {
  let controller: CategoriaController;
  let categoria  : Categoria ;
  
 const mockCategoriaService ={
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
      controllers: [CategoriaController],
      providers: [CategoriaService],
    })
        .overrideProvider(CategoriaService)
        .useValue(mockCategoriaService)
        .compile();

    controller = module.get<CategoriaController>(CategoriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', () => {
  
    const dto = {nombre: 'alimento', estado:'activo'};

    expect( controller.createCategoria(dto)).toEqual({
     id: expect.any(Number),
      ...dto,
  
    });
    expect(mockCategoriaService.create).toHaveBeenCalledWith(dto);
  });

  it('update',);

});