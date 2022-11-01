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

    //! Emite a TODOS los clientes
    this.wss.emit(
      'clients-updated',
      this.messagesWebSocketsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWebSocketsService.removeClient(client.id);

    //! Emite a TODOS los clientes
    this.wss.emit(
      'clients-updated',
      this.messagesWebSocketsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    //! Emite únicamente al cliente actual
    // client.emit('message-from-server', {
    //   fullName: 'Soy Yo!',
    //   message: payload.message ||'no-message!!'
    // })

    //! Emitir a todos MENOS al cliente actual
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Soy Yo!',
    //   message: payload.message ||'no-message!!'
    // })

    //! Emite a TODOS los clientes
    this.wss.emit('message-from-server', {
      fullName: 'Soy Yo!',
      message: payload.message || 'no-message!!',
    });
  }
}
