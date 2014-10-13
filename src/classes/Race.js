
function Race(name, owner, scene) {
    this.timestamp      = Date.now();
    this.name           = name;
    this.scene          = scene || "field";
    this.owner          = owner;
    this.runners        = {};
    this.state          = 'waiting';   //  waiting | closed | playing | finished
    this.questions      = {
        ids: [],
        current: undefined
    };
    this.runnerNb       = 0;
}