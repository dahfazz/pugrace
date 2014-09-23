
function Race(name, owner) {
    
    var _quizz = new Quizz();
    
    this.timestamp = Date.now();
    this.name     = name;
    this.owner    = owner;
    this.runners  = {};
    this.state    = 'waiting';   //  waiting | closed | playing | finished
    this.quizz    = JSON.parse(JSON.stringify(_quizz));
    this.runnerNb = 0;
}