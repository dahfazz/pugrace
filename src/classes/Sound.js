/**
 * @param {string} prefix
 * @constructor
 */
function Sound() {
    this.player = document.getElementById('soundPlayer');
    this.filePath = '/assets/sounds/';
}


Sound.prototype.play = function (path) {
    this.player.src = this.filePath + path;
    this.player.load();
    this.player.play();
};

Sound.prototype.stop = function (id) {
    this.player.pause();
};

var sound = new Sound();