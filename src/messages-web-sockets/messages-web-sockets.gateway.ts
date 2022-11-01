import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagesWebSocketsService } from './messages-web-sockets.service';

@WebSocketGateway({ cors: true })
export class MessagesWebSocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server
  constructor(
    private readonly messagesWebSocketsService: MessagesWebSocketsService,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    this.messagesWebSocketsService.registerClient(client);

    this.wss.emit('clients-updated', this.messagesWebSocketsService.getConnectedClients())
  }

  handleDisconnect(client: Socket) {
    this.messagesWebSocketsService.removeClient(client.id);

    this.wss.emit('clients-updated', this.messagesWebSocketsService.getConnectedClients())
  }
}
