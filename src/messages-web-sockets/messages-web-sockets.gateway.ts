import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessagesWebSocketsService } from './messages-web-sockets.service';

@WebSocketGateway({ cors: true })
export class MessagesWebSocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messagesWebSocketsService: MessagesWebSocketsService,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    // console.log('Cleinte conectado: ', client.id);
    this.messagesWebSocketsService.registerClient(client);
    console.log({
      conectados: this.messagesWebSocketsService.getConnectedClients(),
    });
  }

  handleDisconnect(client: Socket) {
    // console.log('Cleinte desconectado: ', client.id);
    this.messagesWebSocketsService.removeClient(client.id);
  }
}
