import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GamesComponent } from '../games/games.component';
import { People, StarWarsServiceService } from '../services/sw/star-wars-service.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, GamesComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit, OnDestroy {
  username = 'jhonatan';
  isLoggedIn = true;
  favGame = '';
  people:People[]=[];
  swService:StarWarsServiceService=inject(StarWarsServiceService);
  websocketService:WebsocketService=inject(WebsocketService);

  people2$=this.swService.getPeople();
  messages: string[] = [];
  private socketSubscription: Subscription | undefined;



  constructor(){
  const swPeople=this.swService.getAllPeople().then(data=>{
    if(data?.results){
      const people = data.results.map((personData:any) => {
        return {
          name:personData.name,
          height: personData.height
        }
      });
      this.people=people;
    }
  });
  }
  ngOnInit(): void {
    this.socketSubscription = this.websocketService?.getMessages()?.subscribe(message => {
      this.messages.push(message+'huellaRecibido');
    });
  }

  sendMessage(message: string): void {
    console.log("Enviando message:  ",message)
    this.websocketService.sendMessage(message+'huellaEnviado');
  }

  ngOnDestroy(): void {
    this.socketSubscription?.unsubscribe();
    this.websocketService.close();
  }
  getFavorite(gameName: string) {
    this.favGame = gameName;
    alert('IMPRIMIENDO DESDE PADRE!!'+this.favGame);
  }
  greet() {
    alert('HOLAAA!!');
  }
}
