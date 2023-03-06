import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OthelloBoardComponent } from './othello-board/othello-board.component';
import { WebSocketService } from './websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    OthelloBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    
  ],
  providers: [  WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
