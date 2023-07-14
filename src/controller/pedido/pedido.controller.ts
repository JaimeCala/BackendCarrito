import { Controller, Put, ParseIntPipe, Param, NotFoundException, Body, Delete, Post, Get, UseInterceptors, UploadedFile, Res  } from '@nestjs/common';
import { PedidoService } from 'src/service/pedido/pedido.service';
import { Pedido } from 'src/modules/pedido/pedido.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { filetipo } from '../img-categoria/interface.imgcategoria';
import { getany } from '../img-categoria/interface.getcategoria';

@Controller('pedido')
export class PedidoController {

    
constructor(private service:PedidoService){}

    @Get('/pedidos')
    async getPedidos( ): Promise<Pedido[]>{
        const pedidos = await this.service.getPedidos();
        return pedidos;
        
    }
    @Get('/pedidos/esperacount')
    async getPedidosEsperaCount( ): Promise<number>{
        const pedidos = await this.service.getPedidosEsperaCount();
        return pedidos;
        
    }

    @Get('/:id')
    async getPedido(@Param('id', ParseIntPipe) id: number): Promise<Pedido>{
        const pedido = await this.service.getPedido( id);
        return pedido;
    }
    @Get('pedidorealizado/:idusuario')
    async getPedidoRealizado(@Param('idusuario', ParseIntPipe) idusuario: number): Promise<Pedido[]>{
        const pedido = await this.service.getPedidoRealizados( idusuario);
        return pedido;
    }

    @Get('pdfPagoPedido/:pdfNombre')
    async getImgcategoria(@Param('pdfNombre') pdf: string, @Res() res:getany): Promise<any>{

        res.sendFile(pdf, {root: 'public/uploads/gauchers'});
    }

    @Post('/create')
    @UseInterceptors(   FileInterceptor('file',
    {
        storage: diskStorage({
            destination: './public/uploads/gauchers',
            

            filename:(req, file, cb)=> {
                            
                const randomName = Array(32).fill(null).map(()=> (Math.round(Math.random()*16)).toString(16)).join('')
                //return cb(null, `${file.originalname}${extname(file.originalname)}`)
                return cb(null, `${randomName}${extname(file.originalname)}`)
            }
            
        }),
        /*fileFilter: (req, file, cb)=>{
            if(!file.originalname.match(/\.(pdf)$/)){
                    return cb(new Error('Archivo inválido'),false)
            }
            cb(null, true);
        },*/
        limits: {fileSize: 3*1024*1024} //3mb max
        
        
    }
    
    ))
        async createPedido(@Body() pedido: Pedido, @UploadedFile() file: Express.Multer.File ):Promise<Pedido>{
        const createdPedido = await this.service.createPedido(pedido, `${file.filename}`,`${file.path}`);
        return createdPedido;
    }
    /*@Post('/create/pedidopdf')
    @UseInterceptors(   FileInterceptor('file',
    {
        storage: diskStorage({
            destination: './public/uploads/gauchers',
            

            filename:(req, file, cb)=> {
                            
                const randomName = Array(32).fill(null).map(()=> (Math.round(Math.random()*16)).toString(16)).join('')
                //return cb(null, `${file.originalname}${extname(file.originalname)}`)
                return cb(null, `${randomName}${extname(file.originalname)}`)
            }
            
        }),
        fileFilter: (req, file, cb)=>{
            if(!file.originalname.match(/\.(pdf)$/)){
                    return cb(new Error('Archivo inválido'),false)
            }
            cb(null, true);
        },
        limits: {fileSize: 3*1024*1024} //3mb max
        
        
    }
    
    ))
        async createPedidoAndPDF(@Body() pedido: Pedido, @UploadedFile() file: Express.Multer.File):Promise<Pedido>{
        const createdPedido = await this.service.createPedidoAndPDF(pedido , `${file.originalname}`,`${file.path}`);
        return createdPedido;
    }*/

    @Put('delete/:id')
    async deletepedido(@Param('id', ParseIntPipe) id: number): Promise<void>{
        const pedidodelete = await this.service.deletePedido(id);
        if(!pedidodelete) throw new NotFoundException('No hay registro con ese id para eliminar');
        return pedidodelete;

    }
    /*@Put('/:id')
    async updatepedido(@Param('id', ParseIntPipe) id: number , @Body() pedido: Pedido): Promise<Pedido>{
        const updatepedido = await this.service.updatePedido(id, pedido);
        return updatepedido;

    }*/
    @Put('/:id')
    async updatepedido(@Param('id', ParseIntPipe) id: number ): Promise<Pedido>{
        const updatepedido = await this.service.updatePedido(id);
        return updatepedido;

    }

    @Put('enviado/:id')
    async updatepedidoEnviado(@Param('id', ParseIntPipe) id: number ): Promise<Pedido>{
        const updatepedido = await this.service.updatePedidoEnviado(id);
        return updatepedido;

    }

}
