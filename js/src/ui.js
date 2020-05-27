class UI {
  constructor(client, map, options) {
    this._client = client;
    this._map = map;

    this._count = document.getElementById(options.countID);
    this._table = document.getElementById(options.astronautsID);
    this._error = document.getElementById(options.errorID);
    this._clock = document.getElementById(options.clockID);
    this._defaultClockClass = options.defaultClockClass;
    this._alertClockClass = options.alertClockClass;

    document.getElementById('call-to-action').addEventListener('click', function() {
      console.log('hi');
    });
  }

  update = () => {
    this._client.getAstronauts(this._onAstronautsSuccess, this._onFailure);
    this._client.getISSPosition(this._onPositionSuccess, this._onFailure);
  }

  displayClock = (time) => {
    this._clock.textContent = `${this._zeroPad(time.hour)}:${this._zeroPad(time.minutes)}:${this._zeroPad(time.seconds)}`;
  }

  toggleAlertClock = () => {
    this._clock.classList.add(this._alertClockClass);
    this._clock.classList.remove(this._defaultClockClass);
  }

  toggleDefaultClock = () => {
    this._clock.classList.remove(this._alertClockClass);
    this._clock.classList.add(this._defaultClockClass);
  }

  _onAstronautsSuccess = (astronauts) => {
    this._updateCount(astronauts);
    this._updateTable(astronauts);
  }

  _onPositionSuccess = (position) => {
    this._map.update(position.latitude, position.longitude);
  }

  _updateCount = (astronauts) => {
    this._count.textContent = astronauts.length;
  }

  _updateTable = (astronauts) => {
    let fragment = new DocumentFragment(), row, name, craft;

    astronauts.forEach(function (astronaut) {
      row = document.createElement('tr');

      name = row.insertCell(0);
      name.textContent = astronaut.name;

      craft = row.insertCell(1);
      craft.textContent = astronaut.craft;

      fragment.appendChild(row);
    });

    this._table.innerHTML = '';
    this._table.appendChild(fragment);
  }

  _onFailure = (error) => {
    this._error.textContent += `Error: ${error.status} ${error.statusText}, when requesting URL ${error.url}.\n${error.body}`;
  }

  _zeroPad(number) {
    return number.toString().padStart(2, '0');
  }
}
