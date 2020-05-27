describe('Client', function() {
  let client, request, result;

  beforeEach(function() {
    client = new Client();
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  function onSuccess(data) {
    result = data;
  }

  function onFailure(error) {
    result = error;
  }

  describe('#getAstronauts', function() {
    beforeEach(function() {
      client.getAstronauts(onSuccess, onFailure);
      request = jasmine.Ajax.requests.mostRecent()
    });

    describe('when successful', function() {
      beforeEach(function() {
        request.respondWith(TestResponses.astronauts.success);
      });

      it('makes a GET request', function() {
        expect(request.method).toBe('GET');
      });

      it('makes a request to the astronauts endpoint', function() {
        expect(request.url).toBe(client.astronautsURL);
      });

      it('returns the astronauts', function() {
        let astronauts = TestResponses.astronauts.success.response.people;
        expect(result).toEqual(astronauts);
      });
    });

    describe('when failed', function() {
      it('returns HTTP errors', function() {
        request.respondWith(TestResponses.astronauts.failure);

        let error = {
          status: 404,
          statusText: 'Not Found',
          url: client.astronautsURL,
          body: ''
        };

        expect(result).toEqual(error);
      });
    });
  });

  describe('#getISS', function() {
    beforeEach(function() {
      client.getISSPosition(onSuccess, onFailure);
      request = jasmine.Ajax.requests.mostRecent();
    });

    describe('when successful', function() {
      beforeEach(function() {
        request.respondWith(TestResponses.iss.success);
      });

      it('makes a GET request', function() {
        expect(request.method).toBe('GET');
      });

      it('makes a request to the right endpoint', function() {
        expect(request.url).toBe(client.issURL);
      });

      it('returns the position of the ISS', function() {
        let position = TestResponses.iss.success.response.iss_position;
        expect(result).toEqual(position)
      });
    });

    describe('when failed', function() {
      beforeEach(function() {
        request.respondWith(TestResponses.iss.failure);
      });

      it('returns HTTP errors', function() {
        let error = {
          status: 404,
          statusText: 'Not Found',
          url: client.issURL,
          body: ''
        };

        expect(result).toEqual(error);
      });
    });
  });
});
