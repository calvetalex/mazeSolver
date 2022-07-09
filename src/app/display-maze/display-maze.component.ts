import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cell } from '../Class/display/Cell.class';
import { MazeDataService } from '../Services/MazeData.service';

@Component({
  selector: 'app-display-maze',
  template: `<canvas #canvas width="500" height="500"></canvas>`,
  styleUrls: ['./display-maze.component.scss'],
})
export class DisplayMazeComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  maze: any;
  private ctx!: CanvasRenderingContext2D;

  constructor(private mazeDataService: MazeDataService) {
    this.mazeDataService.getData().subscribe((data) => (this.maze = data));
  }

  ngOnInit(): void {
    const test = this.canvas.nativeElement.getContext('2d');
    if (!test || !(test instanceof CanvasRenderingContext2D)) {
      throw new Error('Failed to get 2D context');
    } else {
      this.ctx = test;
    }
    this.animate();
  }

  animate(): void {
    // xCell = xBoard / xMaze
    const sideCell = 500 / this.maze.cells.length;
    for (let row = 0; row < this.maze.cells.length; row++) {
      for (let col = 0; col < this.maze.cells[row].length; col++) {
        const square = new Cell(
          this.ctx,
          this.maze.cells[row][col].walls.left,
          this.maze.cells[row][col].walls.right,
          this.maze.cells[row][col].walls.up,
          this.maze.cells[row][col].walls.down
        );
        square.draw(col, row, sideCell);
      }
    }
  }
}
