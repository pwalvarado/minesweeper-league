MinesweeperLeague.Timer = function () {
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
    this.previousRun = Math.floor((Date.now() - this.startTime)/1000);
  }
};

MinesweeperLeague.Timer.prototype.currentTimeInSeconds = function () {
  if (this.running) {
    return Math.floor((Date.now() - this.startTime)/1000);
  } else {
    return this.previousRunTime();
  }
};

MinesweeperLeague.Timer.prototype.previousRunTime = function () {
  this.previousRun = this.previousRun || 0;
  return this.previousRun;
};
