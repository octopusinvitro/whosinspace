class Clock {
  static SMALL_TICK = 1000;
  static LONG_TICK = 5000;

  constructor(ui) {
    this._ui = ui;
  }

  start = () => {
    this.tick();
    setTimeout(this.start, Clock.SMALL_TICK);
  }

  tick = () => {
    let time = this._now();
    this._ui.displayClock(time);

    if (this._isLongTick(time.seconds)) {
      let sound = new Audio('tada.mp3');
      sound.play();

      this._ui.update();
      this._ui.toggleAlertClock();
    }

    if (this._isNormalTick(time.seconds)) {
      this._ui.toggleDefaultClock();
    }
  }

  _now = () => {
    let date = new Date();
    return {
      hour: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    }
  }

  _isLongTick = (seconds) => {
    return seconds % (Clock.LONG_TICK / 1000) === 0;
  }

  _isNormalTick = (seconds) => {
    return seconds % (Clock.LONG_TICK / 1000) === 1;
  }
}
