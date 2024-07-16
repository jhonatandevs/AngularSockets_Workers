import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;
  constructor() {
    this.socket$ = webSocket({
      url: 'https://echo.websocket.org/',
      deserializer: ({ data }) => {
        try {
          return JSON.parse(data);
        } catch (e) {
          return data;
        }
      }
    });
  }

  sendMessage(message: any): void {
    console.log("SEND")
    this.socket$.next(message);
  }

  getMessages(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.socket$.subscribe({
        next: (message) => {
          try {
            console.log("Recibido..",message)
            const parsedMessage = JSON.parse(message);
            observer.next(parsedMessage);
          } catch (e) {
            observer.next(message);
          }
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete()
      });
    });
  }

  close(): void {
    this.socket$.complete();
  }
}
