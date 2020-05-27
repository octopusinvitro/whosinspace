describe('Map', function() {
  let map, mapContainer, leafletMap, layer, marker;

  beforeEach(function() {
    createMapContainer();

    map = new Map(mapContainer.id);
    leafletMap = map.map;

    let layers = [];
    leafletMap.eachLayer(function(layer) { layers.push(layer); });
    layer = layers[0];
    marker = layers[1];
  });

  afterEach(function() {
    mapContainer.remove();
  });

  describe('#initialize', function() {
    it('adds a map to the right container', function() {
      expect(leafletMap.getContainer()).toEqual(mapContainer);
    })

    it('sets the map with an initial zoom', function() {
      expect(leafletMap.getZoom()).toEqual(3);
    });

    it('sets the tiles style', function() {
      let testTileCoordinates = { x: 0, y: 0, z: 0 };
      expect(layer.getTileUrl(testTileCoordinates)).toContain('mapbox/satellite-streets-v11');
    });

    it('sets the tiles with an attribution', function() {
      expect(layer.getAttribution()).toContain('OpenStreetMap');
    });

    it('sets the tiles with a max zoom', function() {
      expect(leafletMap.getMaxZoom()).toEqual(18);
    });

    it('sets the tiles size', function() {
      expect(layer.getTileSize()).toEqual({ x: 512, y: 512 });
    });

    it('sets the token', function() {
      expect(layer.options.accessToken).not.toBe(null);
    });

    it('sets the right size for the marker icon', function() {
      expect(marker.getIcon().options.iconSize).not.toEqual([0, 0]);
    });

    it('sets the right anchor for the marker icon', function() {
      expect(marker.getIcon().options.iconAnchor).not.toEqual([0, 0]);
    });

    it('sets the right popup anchor for the marker icon', function() {
      expect(marker.getIcon().options.popupAnchor).not.toEqual([0, 0]);
    });
  });

  describe('#update', function() {
    beforeEach(function() {
      map.update(51.505, -0.09);
    });

    it('centers the map in position', function() {
      expect(leafletMap.getCenter()).not.toEqual({ lat: 0, lng: 0 });
    });

    it('updates the marker position', function() {
      expect(marker.getLatLng()).toEqual({ lat: 51.505, lng: -0.09 });
    });

    it('updates popup content with the current position with two decimals', function() {
      let popup = marker.getPopup();
      expect(popup.getContent()).toContain('51.51');
      expect(popup.getContent()).toContain('-0.09');
    });
  });

  function createMapContainer() {
    mapContainer = document.createElement('div');
    mapContainer.id = 'map';
    mapContainer.setAttribute('height', '200px');
    document.body.appendChild(mapContainer);
  }
});
