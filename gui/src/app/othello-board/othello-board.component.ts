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
  moves = [];
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

    // console.log("Placing piece at row " + row + " and column " + col);
    for (let i = 0; i < this.moves.length; i++) {
      if (this.moves[i] == row.toString() + col.toString()) {
        this.socket.send(row.toString() + col.toString());
        break;
      }
    }

  }

  onStart() {
    this.disabled = !this.disabled;
    this.myStyle = { backgroundColor: 'Purple', color: 'Purple' };
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

      // console.log(event.data);
      var obj = JSON.parse(event.data);
      if (obj["result"] != null){
        switch (obj["result"]) {
          case "win":
            this.board = obj["board"].map((row: string[]) => row.map((piece: string) => piece));
            alert("You win!");
            break;
          case "lose":
            this.board = obj["board"].map((row: string[]) => row.map((piece: string) => piece));
            alert("You lose!");
            break;
          case "draw":
            this.board = obj["board"].map((row: string[]) => row.map((piece: string) => piece));
            alert("Tie!");
            break;
        }
      this.myStyle = { backgroundColor: 'blue', color: 'white' };
      this.disabled = !this.disabled;
      }
      else{
      // console.log(obj["board"]);
      this.moves = obj["moves"];
      this.board = obj["board"].map((row: string[]) => row.map((piece: string) => piece));
      if (obj["moves"].length != null) {
      for (let i = 0; i < obj["moves"].length; i++) {
        let x = obj["moves"][i].charAt(0);
        let y = obj["moves"][i].charAt(1);
        // console.log(x);
        // console.log(y);
        // console.log(this.board[x][y]);
        this.board[x][y] = "3";
    
      }
    }

    }
      // console.log('WebSocket message received:', obj);
    });

    this.socket.addEventListener('close', event => {
      console.log('WebSocket connection closed');
    });
  }






  ngOnInit(): void {

  }


}
