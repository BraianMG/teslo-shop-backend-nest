import { JwtService } from '@nestjs/jwt';
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
import { JwtPayload } from '../auth/interfaces';
import { NewMessageDto } from './dtos/new-message.dto';
import { MessagesWebSocketsService } from './messages-web-sockets.service';

@WebSocketGateway({ cors: true })
export class MessagesWebSocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  constructor(
    private readonly messagesWebSocketsService: MessagesWebSocketsService,
    private readonly jwtService: JwtService,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      client.disconnect();
      return;
    }

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
