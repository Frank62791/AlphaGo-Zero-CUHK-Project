import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:8000');

    this.socket.addEventListener('open', event => {
      console.log('WebSocket connection opened');
    });

    this.socket.addEventListener('message', event => {
      console.log('WebSocket message received:', event.data);
    });

    this.socket.addEventListener('close', event => {
      console.log('WebSocket connection closed');
    });
  }

  sendMessage(message: string) {
    this.socket.send(message);
  }
}
