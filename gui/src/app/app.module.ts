import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OthelloBoardComponent } from './othello-board/othello-board.component';
import { WebSocketService } from './websocket.service';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from  '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { GoGameComponent } from './go-game/go-game.component';
import { GoBangComponent } from './go-bang/go-bang.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    OthelloBoardComponent,
    GoGameComponent,
    GoBangComponent,
    BugReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule

    
  ],
  providers: [ WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
