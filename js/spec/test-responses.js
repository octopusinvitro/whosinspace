var TestResponses = {
  astronauts: {
    success: {
      status: 200,
      statusText: 'OK',
      contentType: 'application/json',
      response: JSON.parse('{"number": 3, "message": "success", "people": [{"craft": "ISS", "name": "Mae Jemison"}, {"craft": "ISS", "name": "Christina Koch"}, {"craft": "ISS", "name": "Jessica Meir"}]}')
    },
    failure: {
      status: 404,
      statusText: 'Not Found',
      contentType: 'application/json',
      response: ''
    }
  },

  iss: {
    success: {
      status: 200,
      statusText: 'OK',
      contentType: 'application/json',
      response: JSON.parse('{"timestamp": 1588268945, "message": "success", "iss_position": {"longitude": "96.9187", "latitude": "0.0328"}}')
    },
    failure: {
      status: 404,
      statusText: 'Not Found',
      contentType: 'application/json',
      response: ''
    }
  }
};
