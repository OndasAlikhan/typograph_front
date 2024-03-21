class Timer {
  private _isRunning = false;
  private startTime = 0;
  startTimer() {
    this._isRunning = true;
    this.startTime = Date.now();
  }
  stopTimer() {
    this._isRunning = false;
    const endTime = Date.now();
    const millisecondsPassed = endTime - this.startTime;
    this.startTime = 0;
    return millisecondsPassed / 1000 / 60;
  }
  secondsToHms(seconds: number | string) {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    const hDisplay =
      h > 0 && h < 10 ? `0${h}:` : h >= 10 && h < 100 ? `${h}:` : "";
    const mDisplay =
      m > 0 && m < 10 ? `0${m}:` : m >= 10 && m < 100 ? `${m}:` : "00:";
    const sDisplay =
      s > 0 && s < 10 ? `0${s}` : s >= 10 && s < 100 ? `${s}` : "00";
    return hDisplay + mDisplay + sDisplay;
  }

  get isRunning() {
    return this._isRunning;
  }
}

export default Timer;
