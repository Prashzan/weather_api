const axios = require('axios')


const geocode = async (address) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicHJhc2hhbnQtbmFkYWwtbWFwYm94IiwiYSI6ImNrZzE3enBwaTBldHQyeHF3Yjd3eGpzeG0ifQ.nUT30IZwadc0qB7x8bychg&limit=1'


    const response = await axios.get(url)

    const geo_data = await response.data

    const latitude = geo_data.features[0].center[1]
    const longitude = geo_data.features[0].center[0]
    const placeName = geo_data.features[0].place_name

    return {longitude: longitude,
            latitude: latitude,
            placeName: placeName};
}

module.exports = geocode