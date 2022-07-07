import Prando from "prando";
import Maze from "./Maze.js";

export default class Generator {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  generateMaze() {
    const rng = new Prando();
    const generatedMaze = new Maze(this.width, this.height);
    const cellStack = [];

    const randomCell = {
      randomHeight: rng.nextInt(0, this.height - 1),
      randomWidth: rng.nextInt(0, this.width - 1),
    };
    let currentCell = { x: randomCell.randomWidth, y: randomCell.randomHeight };

    do {
      const validDirections = [];
      generatedMaze.visitCell(currentCell.y, currentCell.x);
      const unvisitedNeighbours = generatedMaze.getUnvisitedNeigbour(
        currentCell.y,
        currentCell.x
      );
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        validDirections.push(unvisitedNeighbours[i].direction);
      }
      if (validDirections.length > 0) {
        cellStack.push(currentCell);
        const nextDirection =
          validDirections[rng.nextInt(0, validDirections.length - 1)];
        generatedMaze.removeWall(currentCell.y, currentCell.x, nextDirection);
        unvisitedNeighbours.forEach((neighbour) => {
          if (neighbour.direction === nextDirection) {
            currentCell = {
              x: neighbour.x,
              y: neighbour.y,
            };
          }
        });
      } else {
        currentCell = cellStack.pop();
      }
    } while (cellStack.length > 0);

    return generatedMaze;
  }

  getValidDirections(unvisitedNeighbours) {
    return unvisitedNeighbours.map((neighbour) => neighbour.direction);
  }

  randomisedWalk(currentCell, rng, maze) {
    const modifiedMaze = maze;
    let unvisitedNeighbours = modifiedMaze.getUnvisitedNeigbour(
      currentCell.y,
      currentCell.x
    );
    let validDirections = this.getValidDirections(unvisitedNeighbours);

    while (validDirections.length > 0) {
      const nextDirection =
        validDirections[rng.nextInt(0, validDirections.length - 1)];
      modifiedMaze.removeWall(currentCell.y, currentCell.x, nextDirection);

      unvisitedNeighbours.forEach((neighbour) => {
        if (neighbour.direction === nextDirection) {
          currentCell = {
            x: neighbour.x,
            y: neighbour.y,
          };
          modifiedMaze.visitCell(currentCell.y, currentCell.x);
        }
      });
      unvisitedNeighbours = modifiedMaze.getUnvisitedNeigbour(
        currentCell.y,
        currentCell.x
      );
      validDirections = this.getValidDirections(unvisitedNeighbours);
    }

    return modifiedMaze;
  }
}
