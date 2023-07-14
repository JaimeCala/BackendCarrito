import { Controller, Post, Get, UseInterceptors, UploadedFile, Param, Res, Body, Put, ParseIntPipe } from '@nestjs/common';
import { ImgProducto } from 'src/modules/img-producto/img-producto.entity';
import { ImgProductoService } from 'src/service/img-producto/img-producto.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { filetipo } from '../img-categoria/interface.imgcategoria';
import { getany } from '../img-categoria/interface.getcategoria';
import { Producto } from '../../modules/producto/producto.entity';

@Controller('img-producto')
export class ImgProductoController {

    constructor(private imgProductoService: ImgProductoService ){}

    

    @Post('/uploadImg')
    @UseInterceptors( FileInterceptor('file',{
        storage: diskStorage({
            destination: './public/uploads/imgproductos',

            filename:(req, file, cb)=> {
                const randomName = Array(32).fill(null).map(()=> (Math.round(Math.random()*16)).toString(16)).join('')
                return cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }
    
    ))
    async  uploadFiles( @Body() producto: ImgProducto  , @UploadedFile() file: filetipo): Promise<any>{
        
    const guardarImg = await this.imgProductoService.createImgProducto( producto ,`${file.filename }`, `${file.path }`);
    return guardarImg;
            
    }

    @Get('/imgproductos')
    async getImgProductos(): Promise<ImgProducto[]>{
        const imgproductos = await this.imgProductoService.getImgCates();
        return imgproductos;
        
    }

    @Get('/:imgPath')
    async getImgproducto(@Param('imgPath') image: string, @Res() res:getany): Promise<any>{

        res.sendFile(image, {root: 'public/uploads/imgproductos'});
    }

    @Put('/:idimgproducto')
    @UseInterceptors(FileInterceptor('file',
    {
        
        storage: diskStorage({
            destination: './public/uploads/imgproductos',
           
                 filename:(req, file, cb)=> {
       
                    const randomName = Array(32).fill(null).map(()=> (Math.round(Math.random()*16)).toString(16)).join('')
             
                    return cb(null, `${randomName}${extname(file.originalname)}`)

            }
        
        })
    }
    
    ))
    async updateImgCategoria(@Param('idimgproducto', ParseIntPipe) idimgproducto: number ,@UploadedFile() file: filetipo): Promise<any>{
       if(file!=null)
       {
           const updateimgproducto = await this.imgProductoService.updateImgProducto(idimgproducto,`${file.filename }`, `${file.path }`);
        return updateimgproducto;
       }
       return
        
    }
   

  


}
