const axios = require("axios");

exports.getData = async (address) => {
  try {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeAddress(address) +
      ".json?access_token=pk.eyJ1IjoiYW5kcmVhYmVjZXJyYWIiLCJhIjoiY2theXdqZG5qMDRpcjJ4cDhvMXowNnczMyJ9.xpaU9oNEgYxG1VE6PG6UKg";

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
