MinesweeperLeague.Timer = function () {
  this.previousRun = 0;
  this.running = false;
};

MinesweeperLeague.Timer.prototype.start = function () {
  if (!this.running) {
    this.running = true;
    this.startTime = Date.now();
  }
};

MinesweeperLeague.Timer.prototype.stop = function () {
  if (this.running) {
    this.running = false;
    this.stopTime = Date.now();
    this.previousRun = Math.floor((this.stopTime - this.startTime)/1000);
  }
};

MinesweeperLeague.Timer.prototype.currentTime = function () {
  if (this.running) {
    return Math.floor((Date.now() - this.startTime)/1000);
  } else {
    return this.previousRun;
  }
};
