import { Component, OnInit } from '@angular/core';
import { MazeDataService } from '../Services/MazeData.service';

@Component({
  selector: 'app-display-maze',
  templateUrl: './display-maze.component.html',
  styleUrls: ['./display-maze.component.scss'],
})
export class DisplayMazeComponent implements OnInit {
  maze: any;

  constructor(private mazeDataService: MazeDataService) {
    this.mazeDataService.getData().subscribe((data) => (this.maze = data));
  }

  ngOnInit(): void {}
}
