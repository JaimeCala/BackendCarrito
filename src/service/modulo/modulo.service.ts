import { Injectable } from '@nestjs/common';
import { ModuloRepository } from 'src/modules/modulo/modulo.repository';

@Injectable()
export class ModuloService {
    constructor(private repository:ModuloRepository){}
}
