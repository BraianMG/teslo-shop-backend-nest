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
    console.log('Cleinte conectado: ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Cleinte desconectado: ', client.id);
  }
}
