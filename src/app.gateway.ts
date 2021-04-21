import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { SocketService } from "./socket/socket.service";

@WebSocketGateway(4001, { transport: ['websocket'] })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    constructor(private socketService: SocketService){

    }
    @WebSocketServer() public server: Server;
    private logger: Logger = new Logger('AppGateway');
  
  
    afterInit(server: Server) {
      this.socketService.socket = server;
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client connected: ${client.id}`);
    }

}