const Field = require('./Field.js');

const processInput = (rawInput) => {
  const playerInput = rawInput.toString().trim();
  fieldA.onInstruction(playerInput);
  console.log("Where to now?");
} 

process.stdin.on('data', processInput);

const fieldA = new Field(Field.generateField());
fieldA.print();
console.log("Where to?");
