import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { ParametersComponent } from './parameters/parameters.component';
import { DisplayMazeComponent } from './display-maze/display-maze.component';
import { MazeDataService } from './Services/MazeData.service';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayerComponent,
    ParametersComponent,
    DisplayMazeComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [MazeDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
