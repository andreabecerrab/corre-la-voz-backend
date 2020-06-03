const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeAddress(address) +
    ".json?access_token=pk.eyJ1IjoiYW5kcmVhYmVjZXJyYSIsImEiOiJjangzbnIzbDQwMGpwNDNteDV1MXk4ZGtjIn0.xw3oJVI694k3qG_Fjg_u-A&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0 || body === "undefined") {
      callback("Not founded, try again ", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

const encodeAddress = (address) => {
  if (address.includes(" ")) {
    return address.replace(" ", "%20");
  } else {
    return address;
  }
};

module.exports = geocode;
