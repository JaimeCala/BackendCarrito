import { Injectable } from '@nestjs/common';
import { OperacionRepository } from 'src/modules/operacion/operacion.repository';

@Injectable()
export class OperacionService {
    constructor(private repository:OperacionRepository){}
}
