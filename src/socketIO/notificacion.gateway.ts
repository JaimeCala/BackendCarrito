/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


@WebSocketGateway( 8181, {
    cors: { origin: '*'},
})
export class NotificacionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() 
    server : Server;
    

    
    afterInit( server: any){
      console.log('cuando inicia');
         
    }

    handleConnection(client: any, ...args: any[]) {
        console.log('alguien se conectó al socket');
    }

    handleDisconnect(client: any) { 
        console.log('alguien se fue');     
    }
     
    /*@SubscribeMessage('event_join')
    handleJoinRoom(client: Socket, room: string) {
        client.join(`room_${room}`);
    }

    @SubscribeMessage('event_message') //TODO Backend
    handleIncommingMessage( 
        client: Socket,
        payload: { room: string; message: string },
    ) {
        const { room, message } = payload;
        console.log(payload)
        this.server.to(`room_${room}`).emit('new_message',message);
    }

    @SubscribeMessage('event_leave')
    handleRoomLeave(client: Socket, room:string) {
        console.log(`chao room_${room}`)
        client.leave(`room_${room}`);
    }*/

    @SubscribeMessage('sendMessage')
    handleMessage(socket: Socket, message: string){
        this.server.emit('newMessage', message);
        console.log('desde app'+ message);
    }
    @SubscribeMessage('sendNotification')
    handleNotification(socket: Socket, notification: string){
        this.server.emit('newNotification', notification);
        console.log('desde app'+ notification);
    }

}