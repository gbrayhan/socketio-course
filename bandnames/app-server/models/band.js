const { v4: uuidv4 } = require('uuid');

class Band {
    constructor(name, genre, year) {
        this.id = uuidv4();
        this.name = name;
        this.genre = genre;
        this.year = year;
        this.votes = 0;
    }
}

module.exports = Band;
