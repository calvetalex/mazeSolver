import Generator from "./Algorithm.js";

export default (options) => {
  let { width, height, seed } = options;
  if (!width || !height) {
    throw new Error("Expected: { width, height, (seed)}");
  }
  if (typeof width !== "number" || typeof height !== "number") {
    throw new Error("Width and height must be numbers");
  }
  if (!seed) {
    seed = Math.floor(Math.random() * Math.floor(100000));
  }
  const mazeGen = new Generator(width, height);
  return mazeGen.generateMaze();
};
