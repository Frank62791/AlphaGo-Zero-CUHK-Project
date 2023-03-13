import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OthelloBoardComponent } from './othello-board/othello-board.component';
import { GoGameComponent } from './go-game/go-game.component';
import { GoBangComponent } from './go-bang/go-bang.component';
import { BugReportComponent } from './bug-report/bug-report.component';

const routes: Routes = [
  { path: '', component: OthelloBoardComponent },
  { path: 'go-game', component: GoGameComponent },
  { path: 'go-bang', component: GoBangComponent },
  { path: 'bug-report', component: BugReportComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
