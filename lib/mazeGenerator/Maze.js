import fs from "fs";
import Direction from "./Direction.js";

class Cell {
  constructor() {
    this.walls = {
      left: true,
      right: true,
      up: true,
      down: true,
    };

    this.visited = false;
  }

  removeWall(direction) {
    if (Object.values(Direction).find((e) => e === direction)) {
      this.walls[direction] = false;
      return;
    }
    throw new Error("Invalid direction");
  }

  getWallStatus(direction) {
    if (Object.values(Direction).find((e) => e.direction))
      return this.walls[direction];
    throw new Error("Invalid direction");
  }

  setCellVisited(visited) {
    this.visited = visited;
  }

  getCellVisited() {
    return this.visited;
  }

  toString() {
    return `${this.walls.down ? "_" : " "}${this.walls.right ? "|" : " "}`;
  }

  toJSON() {
    return { ...this.walls, visited: this.visited };
  }
}

class Maze {
  constructor(width, height) {
    this.cells = [];

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(new Cell());
      }
      this.cells.push(row);
    }
  }

  getCellVisited(row, column) {
    return this.cells[row][column].getCellVisited();
  }

  visitCell(row, column) {
    this.cells[row][column].setCellVisited(true);
  }

  getFirstUnvisitedCellWithVisitedNeighbour() {
    const unvisitedCells = this.getUnvisitedCells();
    unvisitedCells.forEach((cell) => {
      const visitedNeighbours = this.getVisitedNeigbourIdx(cell.y, cell.x);
      if (visitedNeighbours.length > 0) {
        return {
          firstCell: cell,
          neighbours: visitedNeighbours,
        };
      }
    });
    return false;
  }

  getUnvisitedCells() {
    const unvisitedCells = [];
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if (!this.getCellVisited(i, j)) {
          unvisitedCells.push({ x: j, y: i });
        }
      }
    }
    return unvisitedCells;
  }

  getTotalUnvisitedCells() {
    return this.getUnvisitedCells().length;
  }

  removeWall(row, column, direction) {
    this.cells[row][column].removeWall(direction);
    if (direction === Direction.RIGHT && column + 1 < this.cells[row].length) {
      this.cells[row][column + 1].removeWall(Direction.LEFT);
    } else if (direction === Direction.LEFT && column - 1 >= 0) {
      this.cells[row][column - 1].removeWall(Direction.RIGHT);
    } else if (direction === Direction.UP && row - 1 >= 0) {
      this.cells[row - 1][column].removeWall(Direction.DOWN);
    } else if (direction === Direction.DOWN && row + 1 < this.cells.length) {
      this.cells[row + 1][column].removeWall(Direction.UP);
    }
  }

  getWallStatus(row, column, direction) {
    return this.cells[row][column].getWallStatus(direction);
  }

  getCellNeighbour(row, column) {
    const neighbourIndices = {};

    //  up
    if (row > 0) {
      neighbourIndices.up = { y: row - 1, x: column };
    }
    // down
    if (row < this.cells.length - 1) {
      neighbourIndices.down = { y: row + 1, x: column };
    }
    // left
    if (column > 0) {
      neighbourIndices.left = { y: row, x: column - 1 };
    }
    // right
    if (column < this.cells[0].length - 1) {
      neighbourIndices.right = { y: row, x: column + 1 };
    }
    return neighbourIndices;
  }

  getUnvisitedNeigbour(row, column) {
    const neighbourIndices = this.getCellNeighbour(row, column);
    const unvisitedNeighbours = [];
    if (
      typeof neighbourIndices.up !== "undefined" &&
      !this.getCellVisited(neighbourIndices.up.y, neighbourIndices.up.x)
    ) {
      const cell = {
        direction: Direction.UP,
        x: neighbourIndices.up.x,
        y: neighbourIndices.up.y,
      };
      unvisitedNeighbours.push(cell);
    }
    if (
      typeof neighbourIndices.down !== "undefined" &&
      !this.getCellVisited(neighbourIndices.down.y, neighbourIndices.down.x)
    ) {
      const cell = {
        direction: Direction.DOWN,
        x: neighbourIndices.down.x,
        y: neighbourIndices.down.y,
      };
      unvisitedNeighbours.push(cell);
    }
    if (
      typeof neighbourIndices.left !== "undefined" &&
      !this.getCellVisited(neighbourIndices.left.y, neighbourIndices.left.x)
    ) {
      const cell = {
        direction: Direction.LEFT,
        x: neighbourIndices.left.x,
        y: neighbourIndices.left.y,
      };
      unvisitedNeighbours.push(cell);
    }
    if (
      typeof neighbourIndices.right !== "undefined" &&
      !this.getCellVisited(neighbourIndices.right.y, neighbourIndices.right.x)
    ) {
      const cell = {
        direction: Direction.RIGHT,
        x: neighbourIndices.right.x,
        y: neighbourIndices.right.y,
      };
      unvisitedNeighbours.push(cell);
    }
    return unvisitedNeighbours;
  }

  toString() {
    let stringRepresentation = "";
    for (let topRow = 0; topRow < this.cells[0].length; topRow++) {
      stringRepresentation += this.cells[0][topRow].walls.up ? " _" : "  ";
    }
    stringRepresentation += "\n";

    for (let row = 0; row < this.cells.length; row++) {
      let rowString = "";
      for (let cell = 0; cell < this.cells[row].length; cell++) {
        if (cell === 0 && this.cells[row][cell].walls.left) {
          stringRepresentation += "|";
        }
        rowString += this.cells[row][cell].toString();
      }
      stringRepresentation +=
        row + 1 < this.cells.length ? rowString + "\n" : rowString;
    }
    return stringRepresentation;
  }

  toJSON() {
    const JSONRepresentation = {
      rows: [],
    };
    for (let row = 0; row < this.cells.length; row++) {
      const rowArray = [];
      for (let cell = 0; cell < this.cells[row].length; cell++) {
        rowArray.push(this.cells[row][cell].toJSON());
      }
      JSONRepresentation.rows.push(rowArray);
    }
    return JSONRepresentation;
  }

  writeJSON() {
    const data = JSON.stringify(this.toJSON());
    try {
      fs.writeFileSync("mazeData.json", data, "utf-8");
    } catch(e) {
      console.error(e);
    }
  }
}

export default Maze;
