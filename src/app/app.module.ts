import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { ParametersComponent } from './parameters/parameters.component';
import { DisplayMazeComponent } from './display-maze/display-maze.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayerComponent,
    ParametersComponent,
    DisplayMazeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
