export class Cell {
  constructor(
    private ctx: CanvasRenderingContext2D,
    left: boolean,
    right: boolean,
    up: boolean,
    down: boolean
  ) {}

  draw(x: number, y: number, z: number) {
    this.ctx.fillRect(z * x, z * y, z, z);
  }
}
