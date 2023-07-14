import { Controller, Get, Post, Delete, Put, Param, ParseIntPipe, Body, NotFoundException } from '@nestjs/common';
import { ClienteService } from 'src/service/cliente/cliente.service';
import { Cliente } from 'src/modules/cliente/cliente.entity';

@Controller('cliente')
export class ClienteController {

constructor(private service:ClienteService){}

    
    @Get('/clientes')
    async getClientes( ): Promise<Cliente[]>{
        const clientes = await this.service.getClientes();
        return clientes;
        
    }

   
    

    @Get('/:id')
    async getCliente(@Param('id', ParseIntPipe) id: number): Promise<Cliente>{
        const cliente = await this.service.getCliente( id);
        return cliente;
    }

    @Get('getclienteUsuario/:id')
    async getClienteUsuario(@Param('id', ParseIntPipe) id: number): Promise<any>{
        const cliente = await this.service.getClienteUsuario( id);
        return cliente;
    }

    @Post('/create')
    async createCliente(@Body() cliente: Cliente):Promise<Cliente>{
        const createdCliente = await this.service.createCliente(cliente);
        return createdCliente;
    }

    @Delete('/:id')
    async deletecliente(@Param('id', ParseIntPipe) id: number): Promise<void>{
        const clientedelete = await this.service.deleteCliente(id);
        if(!clientedelete) throw new NotFoundException('No hay registro con ese id para eliminar');
        return clientedelete;

    }
    @Put('/:id')
    async updatecliente(@Param('id', ParseIntPipe) id: number , @Body() cliente: Cliente): Promise<Cliente>{
        const updatecliente = await this.service.updateCliente(id, cliente);
        return updatecliente;

    }
}
