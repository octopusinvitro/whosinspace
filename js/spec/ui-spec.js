describe('UI', function() {
  let ui, client, map, count, table, error, mapContainer, clock,
      options = { countID: 'count', astronautsID: 'astronauts', errorID: 'error', clockID: 'clock', defaultClockClass: 'defaultClock', alertClockClass: 'alertClock' };

  beforeEach(function() {
    createCount();
    createTable();
    createError();
    createClock();
    createMapContainer();

    client = new Client();
    map = new Map(mapContainer.id);
    ui = new UI(client, map, options);

    jasmine.Ajax.install();
  });

  afterEach(function() {
    count.remove();
    table.remove();
    error.remove();
    clock.remove();
    mapContainer.remove();

    jasmine.Ajax.uninstall();
  });

  describe('#update', function() {
    describe('when successful', function() {
      beforeEach(function() {
        jasmine.Ajax.stubRequest(client.astronautsURL).andReturn(TestResponses.astronauts.success);
        jasmine.Ajax.stubRequest(client.issURL).andReturn(TestResponses.iss.success);
        spyOn(map, 'update');
        ui.update();
      });

      it('updates the astronaut count', function() {
        expect(count.textContent).toEqual('3');
      });

      it('updates the astronauts table with all astronauts', function() {
        data = 'Mae Jemison ISS Christina Koch ISS Jessica Meir ISS ';
        tableToData = table.textContent.replace(/ISS/gi, ' ISS ')
        expect(tableToData).toEqual(data);
      });

      it('updates the map with the ISS position', function() {
        expect(map.update).toHaveBeenCalledWith('0.0328', '96.9187');
      });
    });

    describe('when failed', function() {
      beforeEach(function() {
        jasmine.Ajax.stubRequest(client.astronautsURL).andReturn(TestResponses.astronauts.failure);
        jasmine.Ajax.stubRequest(client.issURL).andReturn(TestResponses.iss.failure);
        ui.update();
      });

      it('displays an error with the status', function() {
        expect(error.textContent).toContain('404 Not Found');
      });

      it('displays an error with the failed URL', function() {
        expect(error.textContent).toContain(client.astronautsURL);
      });

      it('joins all errors', function() {
        expect(error.textContent).toContain(client.issURL);
      });
    });

  });

  describe('#displayClock', function() {
    it('displays the formatted time', function() {
      ui.displayClock({ hour: 13, minutes: 1, seconds: 1 });
      expect(clock.textContent).toEqual('13:01:01');
    });
  });

  describe('#toggleAlertClock', function() {
    it('toggles clock to an alert class', function() {
      ui.toggleAlertClock();
      expect(Array.from(clock.classList)).toEqual([options.alertClockClass]);
    });
  });

  describe('#toggleDefaultClock', function() {
    it('toggles clock to a default class', function() {
      clock.classList.remove(options.defaultClockClass);
      ui.toggleDefaultClock();
      expect(Array.from(clock.classList)).toEqual([options.defaultClockClass]);
    });
  });

  function createCount() {
    count = document.createElement('span');
    count.id = options.countID;
    document.body.appendChild(count);
  }

  function createTable() {
    table = document.createElement('table');
    table.id = options.astronautsID;

    let row = table.insertRow();
    row.insertCell(0);
    row.insertCell(1);

    document.body.appendChild(table);
  }

  function createError() {
    error = document.createElement('p');
    error.id = options.errorID;
    document.body.appendChild(error);
  }

  function createClock() {
    clock = document.createElement('div');
    clock.id = options.clockID;
    clock.classList.add(options.defaultClockClass);
    document.body.appendChild(clock);
  }

  function createMapContainer() {
    mapContainer = document.createElement('div');
    mapContainer.id = 'map';
    document.body.appendChild(mapContainer);
  }
});
