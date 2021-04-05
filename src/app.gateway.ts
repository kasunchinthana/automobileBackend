import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway(4001, { transport: ['websocket'] })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect{
    handleDisconnect(client: any) {
        throw new Error("Method not implemented.");
    }
    handleConnection(client: any, ...args: any[]) {
        throw new Error("Method not implemented.");
    }

}