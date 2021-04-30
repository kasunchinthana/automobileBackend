import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { SocketService } from "../socket/socket.service";


@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private socketService: SocketService) {

    }
    private logger: Logger = new Logger('EventsGateway');

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client handle connect: ${client.id}`);
        //this.eventsGateway.server.emit('alertToClient', 'get datan from db');
        this.server.emit('alertToClient', "msg");
    }
    handleDisconnect(client: Socket) {
        // this.logger.log('handleDisconnect:   :${client.id}');
        this.logger.log(`Client handleDisconnect: ${client.id} ${client.listeners}`);
    }

    afterInit(server: Server) {
        this.socketService.socket = server;
        this.logger.log('server initialized');
    }

    @WebSocketServer()
    server: Server;

    sendToAll(msg: string) {
        this.logger.log(msg);
        this.server.emit('alertToClient', msg);
    }
}