import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectClients {
  [id: string]: Socket;
}

@Injectable()
export class MessagesWebSocketsService {
  private connectedClients: ConnectClients = {};

  registerClient(client: Socket) {
    this.connectedClients[client.id] = client;
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): number {
    return Object.keys(this.connectedClients).length;
  }
}
