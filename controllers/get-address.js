const axios = require("axios");

exports.getData = async (address) => {
  try {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeAddress(address) +
      ".json?access_token=pk.eyJ1IjoiYW5kcmVhYmVjZXJyYSIsImEiOiJjangzbnIzbDQwMGpwNDNteDV1MXk4ZGtjIn0.xw3oJVI694k3qG_Fjg_u-A&limit=1";

    const response = await axios.get(url);
    const data = response.data.features[0];

    const finaladd = {
      latitude: data.center[1],
      longitude: data.center[0],
      location: data.place_name,
      address: address,
    };

    return finaladd;
  } catch (error) {
    console.log(error);
  }
};

const encodeAddress = (address) => {
  if (address.includes(" ")) {
    return address.replace(" ", "%20");
  } else {
    return address;
  }
};
