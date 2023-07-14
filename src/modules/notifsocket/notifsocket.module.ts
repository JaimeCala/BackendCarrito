import { Module } from '@nestjs/common';
import { NotificacionGateway } from '../../socketIO/notificacion.gateway';

@Module({
    imports: [],
    controllers: [],
    providers: [NotificacionGateway]
})
export class NotifsocketModule {}
