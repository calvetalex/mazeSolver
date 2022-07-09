export class Cell {
  constructor(
    private ctx: CanvasRenderingContext2D,
    public left: boolean,
    public right: boolean,
    public up: boolean,
    public down: boolean
  ) {}

  draw(x: number, y: number, z: number) {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(z * x, z * y, z, z);
    this.ctx.fillStyle = '#fff';
    const sizeLine = Math.round(z * 0.1);
    if (this.left) this.ctx.fillRect(z * x, z * y, sizeLine, z);
    if (this.right) this.ctx.fillRect(z * x + z - sizeLine, z * y, sizeLine, z);
    if (this.up) this.ctx.fillRect(z * x, z * y, z, sizeLine);
    if (this.down) this.ctx.fillRect(z * x, z * y + z - sizeLine, z, sizeLine);
  }
}
