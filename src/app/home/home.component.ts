import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import mazeGenerator from 'lib/mazeGenerator';
import { MazeDataService } from '../Services/MazeData.service';
import { LoadingService } from '../Services/Spinner..service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = this.loader.loading$;
  constructor(
    private mazeDataService: MazeDataService,
    private router: Router,
    public loader: LoadingService
  ) {}

  ngOnInit(): void {}

  async generateMaze(x: number, y: number): Promise<void> {
    return new Promise(async (resolve) => {
      let maze = {};
      setTimeout(() => {
        maze = mazeGenerator({ width: x, height: y });
        console.log(maze);
        console.log(maze.toString());
        resolve(maze);
      }, 1000);
    }).then((maze) => {
      this.mazeDataService.setData(maze);
      this.router.navigate(['/play']);
    });
  }
}
