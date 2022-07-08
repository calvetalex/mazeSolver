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

  async generateMaze(x: number, y: number): Promise<boolean> {
    // this.loader.show();
    return new Promise((resolve) => {
      const maze = mazeGenerator({ width: x, height: y });
      console.log(maze);
      console.log(maze.toString());
      resolve(maze);
    }).then((maze) => {
      this.mazeDataService.setData(maze);
      return true;
    });
    // this.router.navigate(['/play']);
  }
}
