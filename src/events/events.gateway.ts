import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server,Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

    private logger:Logger = new Logger('EventsGateway');

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log('handleConnection:${client.id}');
    }
    handleDisconnect(client: Socket) {
        this.logger.log('handleDisconnect:   :${client.id}');
    }

    afterInit(server: Server) {
        this.logger.log('server initialized');
    }
    
    @WebSocketServer()
    server: Server;

    sendToAll(msg: string) {
        this.logger.log(msg);
        this.server.emit('alertToClient', { type: 'Alert', message: msg });
      }

    // @SubscribeMessage('events')
    // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    //     return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    // }

    // @SubscribeMessage('identity')
    // async identity(@MessageBody() data: number): Promise<number> {
    //     return data;
    // }
}