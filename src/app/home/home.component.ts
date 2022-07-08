import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import mazeGenerator from 'lib/mazeGenerator';
import { MazeDataService } from '../Services/MazeData.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  constructor(private mazeDataService: MazeDataService, private router: Router) {}

  ngOnInit(): void {}

  toggleLoading() {
    this.loading = !this.loading;
  };

  generateMaze(x: number, y: number): any {
    this.toggleLoading();
    const maze = mazeGenerator({ width: x, height: y });
    console.log(maze);
    console.log(maze.toString());
    this.mazeDataService.setData(maze);
    this.router.navigate(['/play']);
  }
}
