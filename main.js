const prompt = require('prompt-sync')({sigint: true});
const EventEmitter = require('events');
const Field = require('./Field.js');

const eEmitter = new EventEmitter();

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const processInput = (rawInput) => {
  const playerInput = rawInput.toString().trim();
  fieldA.onInstruction(playerInput);
  console.log("Where to now?");
} 

process.stdin.on('data', processInput);

const fieldA = new Field(Field.generateField());
fieldA.print();
console.log("Where to?");
