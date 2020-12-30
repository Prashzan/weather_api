const axios = require('axios')


const forecast =  async (latitude, longitude) => {

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude +'&lon=' + longitude +'&appid=8f516ec1175b66290403094bb6b97d96&units=metric'

    const response = await axios.get(url)

    const weather_data = await response.data

    const  {main, name, clouds} = weather_data;

    return { temperature : main.temp , 
                name, 
                cloud_percent : clouds.all};


}



module.exports = forecast