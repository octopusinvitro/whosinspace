describe('Clock', function() {
  let ui = new UI(null, null, {}),
      clock = new Clock(ui);

  beforeEach(function() {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(0, 0, 0, 13, 1, 0));

    spyOn(ui, 'displayClock');
    spyOn(ui, 'update');
    spyOn(ui, 'toggleAlertClock');
    spyOn(ui, 'toggleDefaultClock');
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  describe('tick', function() {
    it('displays clock with the right time', function() {
      clock.tick();
      let now = { hour: 13, minutes: 1, seconds: 0 };
      expect(ui.displayClock).toHaveBeenCalledWith(now);
    });

    it('displays clock in every short tick', function() {
      clock.tick();
      jasmine.clock().tick(Clock.SMALL_TICK);
      clock.tick();
      expect(ui.displayClock).toHaveBeenCalledTimes(2);
    });

    it('updates UI in every long tick', function() {
      clock.tick();
      expect(ui.update).toHaveBeenCalledTimes(1);
    });

    it('toggles clock in every long tick', function() {
      jasmine.clock().tick(Clock.LONG_TICK);
      clock.tick();
      expect(ui.toggleAlertClock).toHaveBeenCalledTimes(1);
    });

    it('toggles clock back after every long tick', function() {
      jasmine.clock().tick(Clock.LONG_TICK);
      clock.tick();
      jasmine.clock().tick(Clock.SMALL_TICK);
      clock.tick();
      expect(ui.toggleDefaultClock).toHaveBeenCalledTimes(1);
    });
  });
});
