import MazeGenerator from './src/mazeGenerator/index.js';

const maze = MazeGenerator({width: 5, height: 6});
console.log(maze.toString());
console.log(maze.toJSON());

