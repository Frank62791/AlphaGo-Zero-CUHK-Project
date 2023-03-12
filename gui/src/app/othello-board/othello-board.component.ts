import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { WebSocketService } from '../websocket.service';
import { decode } from 'utf8';
import { TextDecoder } from 'text-encoding';

@Component({
  selector: 'app-othello-board',
  templateUrl: './othello-board.component.html',
  styleUrls: ['./othello-board.component.css']
})
export class OthelloBoardComponent implements OnInit {

  button = "button"
  myStyle = { backgroundColor: 'blue', color: 'white' };
  rows = [0, 1, 2, 3, 4, 5, 6, 7];
  cols = [0, 1, 2, 3, 4, 5, 6, 7];
  public disabled = false;
  box = document.getElementById('box');
  // Initialize the board state
  board: string[][] = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', '-1', '1', ' ', ' ', ' '],
    [' ', ' ', ' ', '1', '-1', ' ', ' ', ' '],
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
    this.socket.send(row.toString() + col.toString());
  }

  onStart() {
    this.disabled = !this.disabled;
    this.myStyle = { backgroundColor: 'white', color: 'white' };
    this.socket.send("start");


  }



  private socket: WebSocket;

  constructor() {
    const decoder = new TextDecoder('utf-8');
    this.socket = new WebSocket('ws://localhost:8000');

    this.socket.addEventListener('open', event => {
      console.log('WebSocket connection opened');
    });

    this.socket.addEventListener('message', event => {

      console.log(event.data);
      let obj = JSON.parse(event.data);
      console.log(obj["board"]);
      this.board = obj["board"].map((row: string[]) => row.map((piece: string) => piece));


      console.log('WebSocket message received:', obj);
    });

    this.socket.addEventListener('close', event => {
      console.log('WebSocket connection closed');
    });
  }






  ngOnInit(): void {

  }


}
