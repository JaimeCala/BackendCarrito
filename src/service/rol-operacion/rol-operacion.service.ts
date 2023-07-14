import { Injectable } from '@nestjs/common';
import { RolOperacionRepository } from 'src/modules/rol-operacion/rol-operacion.repository';

@Injectable()
export class RolOperacionService {
    constructor(private repository:RolOperacionRepository){}
}
