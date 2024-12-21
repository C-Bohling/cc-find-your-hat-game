const SIZE = 12;
const PERCENT_HOLES = 0.33;

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(initialFieldData) {
    this.field = initialFieldData;
    this.playerLoc = { x: 0, y: 0 };
  }

  static generateField() {
    const field = [];
    const placedHat = false;
    for (let rowNum = 0; rowNum < SIZE; rowNum++) {
      const row = [];

      for (let tileNum = 0; tileNum < SIZE; tileNum++) {
        let tile;
        const randNum = Math.random();

        if (randNum < PERCENT_HOLES) {
          tile = hole;
        } else {
          tile = fieldCharacter;
        }

        row.push(tile);
      }

      field.push(row);
    }

    field[0][0] = pathCharacter;
    const hatCol = Math.floor(Math.random() * SIZE);
    console.log(hatCol);
    field[SIZE - 1][hatCol] = hat;

    return field;
  }

  checkOutOfBounds() {
    return (
      this.playerLoc.x > this.field[0].length - 1 ||
      this.playerLoc.x < 0 ||
      this.playerLoc.y > this.field.length - 1 ||
      this.playerLoc.y < 0
    );
  }

  print() {
    for (const line of this.field) {
      console.log(line.join(""));
    }
  }

  endGame(message) {
    console.log(message);
    process.exit();
  }

  update() {
    if (this.checkOutOfBounds()) {
      this.endGame(
        "Thou has broken line 46-51 of the Field code: trespassing on non-game territory! Game over!"
      );
    }

    const movedToType = this.field[this.playerLoc.y][this.playerLoc.x];

    if (movedToType === hole) {
      this.endGame(
        "Gasp! Thou hast very clumsily and quite ignorantly plummetted into a fearsome yawning chasm! Game over!"
      );
    } else if (movedToType === hat) {
      this.endGame(
        "Thou hast miraculously and triumphantly reclaimed thine precious and most sought-after fedora from the midst of the betrapped field! You are victorious!"
      );
    } else {
      // set currentLocation to a path char
      this.field[this.playerLoc.y][this.playerLoc.x] = pathCharacter;
    }
  }

  movePlayer(input) {
    // returns true if the player was moved and false otherwise
    const inputLower = input.toLowerCase();
    switch (inputLower) {
      case "r":
        this.playerLoc.x++;
        break;
      case "l":
        this.playerLoc.x--;
        break;
      case "u":
        this.playerLoc.y--;
        break;
      case "d":
        this.playerLoc.y++;
        break;
      default:
        console.log("Not a valid command, try again with either l, r, u,or d.");
        return false;
        break;
    }
    return true;
  }

  onInstruction(input) {
    const playerMoved = this.movePlayer(input);
    if (playerMoved) {
      this.update();
      this.print();
    }
  }
}

module.exports = Field;
