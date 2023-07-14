import { Injectable } from '@nestjs/common';
import { AdminRepository } from 'src/modules/admin/admin.repository';

@Injectable()
export class AdminService {
    constructor(private repository:AdminRepository){}
}
