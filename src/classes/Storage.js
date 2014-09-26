/**
 * @param {string} prefix
 * @constructor
 */
function Storage(key) {
    this.key = key;
    this.storage = localStorage;
}

Storage.prototype.set = function(obj) {
    this.storage.setItem(this.key, obj);
};

Storage.prototype.get = function() {
    return this.storage.getItem(this.key);
};


var storage_me   = new Storage('pugrunner_me');
var storage_race = new Storage('pugrunner_race');