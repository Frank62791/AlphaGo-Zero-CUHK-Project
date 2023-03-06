import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-othello-board',
  templateUrl: './othello-board.component.html',
  styleUrls: ['./othello-board.component.css']
})
export class OthelloBoardComponent implements OnInit {

  rows = [0, 1, 2, 3, 4, 5, 6, 7];
  cols = [0, 1, 2, 3, 4, 5, 6, 7];

  // Initialize the board state
  board: string[][] = [    
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'W', 'B', ' ', ' ', ' '],
    [' ', ' ', ' ', 'B', 'W', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ];

  // Get the piece at a given position on the board
  getPiece(row: number, col: number) {
    return this.board[row][col];
  }

  // Place a piece on the board at a given position
  placePiece(row: number, col: number) {
    // TODO: Implement the logic for placing a piece and updating the board state
    console.log("Placing piece at row " + row + " and column " + col);
    this.webSocketService.sendMessage(row.toString()+col.toString());
  }

  constructor(private webSocketService: WebSocketService) { }


  ngOnInit(): void {
    

    
  }

}
