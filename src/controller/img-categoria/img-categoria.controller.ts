import { Controller, Post, UseInterceptors, Param, UploadedFile, Get, ParseIntPipe, Res, Put, Body } from '@nestjs/common';
import { ImgCategoriaService } from 'src/service/img-categoria/img-categoria.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ImgCategoria } from 'src/modules/img-categoria/img-categoria.entity';
import { filetipo } from './interface.imgcategoria';
import { getany } from './interface.getcategoria';



@Controller('img-categoria')
export class ImgCategoriaController {

    constructor(private imgCategoriaService: ImgCategoriaService ){}

    

    @Post('/uploadImg')
    @UseInterceptors(   FileInterceptor('file',
    {
        storage: diskStorage({
            destination: './public/uploads',

            filename:(req, file, cb)=> {
                            
                const randomName = Array(32).fill(null).map(()=> (Math.round(Math.random()*16)).toString(16)).join('')
                return cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }
    
    ))
    async  uploadFiles( @Body()  categoria: ImgCategoria ,  @UploadedFile() file: filetipo): Promise<any>{
        
    const guardarImg = await this.imgCategoriaService.createImgCategoria(  categoria , `${file.filename }`, `${file.path }` );
    return guardarImg;
            
    }

    @Get('/imgcategorias')
    async getImgCategorias(): Promise<ImgCategoria[]>{
        const imgcategorias = await this.imgCategoriaService.getImgCates();
        return imgcategorias;
        
    }

    @Get('/:imgPath')
    async getImgcategoria(@Param('imgPath') image: string, @Res() res:getany): Promise<any>{

        res.sendFile(image, {root: 'public/uploads'});
    }

    /* @Get('/idimg')
    async getImgcategoria(@Res() res:getany): Promise<any>{

        res.sendFile( {root: 'public/uploads'});
        

    }*/
    @Put('/:idimgcategoria')
    @UseInterceptors(FileInterceptor('file',
    {
        
        storage: diskStorage({
            destination: './public/uploads',
           
                 filename:(req, file, cb)=> {
       
                    const randomName = Array(32).fill(null).map(()=> (Math.round(Math.random()*16)).toString(16)).join('')
             
                    return cb(null, `${randomName}${extname(file.originalname)}`)

            }
            

           
        })
    }
    
    ))
    async updateImgCategoria(@Param('idimgcategoria', ParseIntPipe) idimgcategoria: number ,@UploadedFile() file: filetipo): Promise<any>{
       if(file!=null)
       {
           const updateimgcategoria = await this.imgCategoriaService.updateImgCategoria(idimgcategoria,`${file.filename }`, `${file.path }`);
        return updateimgcategoria;
       }
       return
        
    }
    

  


}
