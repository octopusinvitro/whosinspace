class Map {
  constructor(mapID) {
    this.map = L.map(mapID);
    this._marker = null;

    this._initialZoom = 3;
    this._iconImage = { source: '../img/iss.png', width: 191, height: 100, alt: 'ISS station' };
    this._decimalPositions = 2;

    this._token = 'pk.eyJ1Ijoib2N0b3B1c2ludml0cm8iLCJhIjoiY2s5cTZ5MnRlMGhlOTNubW14dWQ3NjJkNCJ9.G-rrNuSyagqnbFLpRG1aag';
    this._attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

    this.initialize();
  }

  initialize() {
    this.map.setZoom(this._initialZoom);
    this._addTile();
    this._addMarker();
  }

  update(latitude, longitude) {
    this.map = this.map.setView([latitude, longitude]);
    this._marker.setLatLng(L.latLng(latitude, longitude));
    this._marker.bindPopup(this._popupContent(latitude, longitude)).openPopup();;
  }

  _addTile() {
    let templateURL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';

    let options = {
      attribution: this._attribution,
      maxZoom: 18,
      // id: 'mapbox/dark-v10',
      id: 'mapbox/satellite-streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: this._token
    };

    L.tileLayer(templateURL, options).addTo(this.map);
  }

  _addMarker() {
    let options = {
      icon: L.icon({
        iconUrl: this._iconImage.source,
        iconSize: [this._iconImage.width, this._iconImage.height],
        iconAnchor: [this._iconImage.width / 2, this._iconImage.height / 2],
        popupAnchor: [0, -this._iconImage.height / 2]
      }),
      alt: this._iconImage.alt
    }

    this._marker = L.marker([0, 0], options).addTo(this.map);
  }

  _popupContent(latitude, longitude) {
    return `The ISS is at lat: <strong>${this._truncate(latitude)}</strong>, lon: <strong>${this._truncate(longitude)}</strong>.`
  }

  _truncate(decimalNumber) {
    return Number.parseFloat(decimalNumber).toFixed(this._decimalPositions);
  }
}
