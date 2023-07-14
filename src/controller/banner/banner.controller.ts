import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Banner } from '../../modules/banner/banner.entity';
import { BannerService } from '../../service/banner/banner.service';
import { getany } from '../img-categoria/interface.getcategoria';
import { filetipo } from '../img-categoria/interface.imgcategoria';

@Controller('banner')
export class BannerController {

    constructor(private bannerService: BannerService ){}

    
    
    @Post('/uploadImg')
    @UseInterceptors(   FileInterceptor('file',
    {
        storage: diskStorage({
            destination: './public/uploads/banner',

            filename:(req, file, cb)=> {
                            
                const randomName = Array(32).fill(null).map(()=> (Math.round(Math.random()*16)).toString(16)).join('')
                return cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }
    
    ))
    async  uploadFiles( @Body()  banner: Banner ,  @UploadedFile() file: filetipo): Promise<any>{

        //console.log('probando img barner', file);
        
    const guardarImg = await this.bannerService.createBanner(  banner , `${file.filename }`, `${file.path }` );
    return guardarImg;
            
    }
    //@UseGuards(AuthGuard())
    @Get('/banners')
    async getBanners(): Promise<Banner[]>{
        const banners = await this.bannerService.getImgBanner();
        return banners;
        
    }
    //@UseGuards(AuthGuard())
    @Get('/:imgPath')
    async getBanner(@Param('imgPath') image: string, @Res() res:getany): Promise<any>{

        res.sendFile(image, {root: 'public/uploads/banner'});
    }

    /* @Get('/idimg')
    async getBanner(@Res() res:getany): Promise<any>{

        res.sendFile( {root: 'public/uploads'});
        

    }*/
    @Put('/:idbanner')
    @UseInterceptors(FileInterceptor('file',
    {
        
        storage: diskStorage({
            destination: './public/uploads/banner',
           
                 filename:(req, file, cb)=> {
       
                    const randomName = Array(32).fill(null).map(()=> (Math.round(Math.random()*16)).toString(16)).join('')
             
                    return cb(null, `${randomName}${extname(file.originalname)}`)

            }
            

           
        })
    }
    
    ))
    async updateBanner(@Param('idbanner', ParseIntPipe) idbanner: number ,@UploadedFile() file: filetipo): Promise<any>{
       if(file!=null)
       {
           const updatebanner = await this.bannerService.updateBanner(idbanner,`${file.filename }`, `${file.path }`);
        return updatebanner;
       }
       return
        
    }

    @Delete('delete/:idbanner')
    async deleteBanner(@Param('idbanner', ParseIntPipe) idbanner: number): Promise<void>{
        const deleteBanner = await this.bannerService.deleteBanner(idbanner);
        //if(!productodelete) throw new NotFoundException('No hay registro con ese idproducto para eliminar');
        return deleteBanner;

    }
    
}
