class Client {
  constructor() {
    this._url = 'http://api.open-notify.org';
    this._astronautsEndpoint = '/astros.json';
    this._issEndpoint = '/iss-now.json';
  }

  getAstronauts(onSuccess, onFailure) {
    let options = {
      url: this.astronautsURL,
      onSuccess: onSuccess,
      onFailure: onFailure,
      property: 'people'
    }

    this._getURL(options);
  }

  getISSPosition(onSuccess, onFailure) {
    let options = {
      url: this.issURL,
      onSuccess: onSuccess,
      onFailure: onFailure,
      property: 'iss_position'
    }

    this._getURL(options);
  }

  get astronautsURL() {
    return `${this._url}${this._astronautsEndpoint}`;
  }

  get issURL() {
    return `${this._url}${this._issEndpoint}`;
  }

  _getURL(options) {
    let xhr = new XMLHttpRequest();

    const onload = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) { return; }
      if (xhr.status === 200) {
        options.onSuccess(xhr.response[options.property]);
      } else {
        options.onFailure(this._buildHTTPError(xhr));
      }
    };

    try {
      xhr.responseType = 'json';
      xhr.onreadystatechange = onload
      xhr.open('GET', options.url);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();
    } catch(error) {
      options.onFailure(this._buildGenericError(xhr, error));
    }
  }

  _buildHTTPError(xhr) {
    return {
      status: Number.isInteger(xhr.status) ? xhr.status : '',
      statusText: xhr.statusText,
      url: xhr.url,
      body: xhr.response
    };
  }
}
