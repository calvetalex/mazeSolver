import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { ParametersComponent } from './parameters/parameters.component';
import { DisplayMazeComponent } from './display-maze/display-maze.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'player', component: PlayerComponent },
  { path: 'play', component: DisplayMazeComponent },
  { path: 'options', component: ParametersComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
