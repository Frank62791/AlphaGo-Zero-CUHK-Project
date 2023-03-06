import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OthelloBoardComponent } from './othello-board/othello-board.component';
const routes: Routes = [
  { path: '', component: OthelloBoardComponent },
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
