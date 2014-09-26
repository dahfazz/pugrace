/**
 * @param {string} prefix
 * @constructor
 */
function Runner(name, character, pwd) {
  this.name       = name;
  this.character  = character;
  this.steps      = 0;
  this.score      = 0;
  this.pwd        = pwd;
  this.state      = 'waiting';  // waiting | animated
  this.race_name  = undefined;
}


Runner.prototype.addStep = function () {
  this.steps++;
};