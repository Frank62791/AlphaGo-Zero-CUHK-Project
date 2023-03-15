import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any> | undefined;

  constructor() {}

  public connect(url: string): WebSocketSubject<any> {
    this.socket$ = new WebSocketSubject(url);
    return this.socket$;
  }

  public get messages$() {
    return 
  }
}
