import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import {
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets/decorators';
import { Socket, Server } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { MessagesWebSocketsService } from './messages-web-sockets.service';

@WebSocketGateway({ cors: true })
export class MessagesWebSocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  constructor(
    private readonly messagesWebSocketsService: MessagesWebSocketsService,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    this.messagesWebSocketsService.registerClient(client);

    this.wss.emit(
      'clients-updated',
      this.messagesWebSocketsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWebSocketsService.removeClient(client.id);

    this.wss.emit(
      'clients-updated',
      this.messagesWebSocketsService.getConnectedClients(),
    );
  }

  // message-from-client
  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    console.log({ clientId: client.id, payload });
  }
}
