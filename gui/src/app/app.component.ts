import { Component } from '@angular/core';
import { OthelloBoardComponent } from './othello-board/othello-board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'othello-game';
  othelloBoard = new OthelloBoardComponent();
  rows = [0, 1, 2, 3, 4, 5, 6, 7];
  cols = [0, 1, 2, 3, 4, 5, 6, 7];
  const = this.othelloBoard.getPiece(0, 0)



  
  
}
