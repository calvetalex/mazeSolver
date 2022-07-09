export class Position {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getPos() {
        return { x: this.x, y: this.y };
    }

    setPos(x:number = this.x , y:number = this.y) {
        this.x = x;
        this.y = y;
    }
}