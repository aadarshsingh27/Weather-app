import axios from 'axios';

// WMO Weather interpretation codes
const getWeatherCondition = (code) => {
    const weatherCodes = {
        0: { text: "Clear sky", icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png" },
        1: { text: "Mainly clear", icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png" },
        2: { text: "Partly cloudy", icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png" },
        3: { text: "Overcast", icon: "https://cdn.weatherapi.com/weather/64x64/day/122.png" },
        45: { text: "Fog", icon: "https://cdn.weatherapi.com/weather/64x64/day/143.png" },
        48: { text: "Depositing rime fog", icon: "https://cdn.weatherapi.com/weather/64x64/day/143.png" },
        51: { text: "Light drizzle", icon: "https://cdn.weatherapi.com/weather/64x64/day/266.png" },
        53: { text: "Moderate drizzle", icon: "https://cdn.weatherapi.com/weather/64x64/day/266.png" },
        55: { text: "Dense drizzle", icon: "https://cdn.weatherapi.com/weather/64x64/day/266.png" },
        61: { text: "Slight rain", icon: "https://cdn.weatherapi.com/weather/64x64/day/176.png" },
        63: { text: "Moderate rain", icon: "https://cdn.weatherapi.com/weather/64x64/day/302.png" },
        65: { text: "Heavy rain", icon: "https://cdn.weatherapi.com/weather/64x64/day/308.png" },
        71: { text: "Slight snow fall", icon: "https://cdn.weatherapi.com/weather/64x64/day/179.png" },
        73: { text: "Moderate snow fall", icon: "https://cdn.weatherapi.com/weather/64x64/day/332.png" },
        75: { text: "Heavy snow fall", icon: "https://cdn.weatherapi.com/weather/64x64/day/338.png" },
        77: { text: "Snow grains", icon: "https://cdn.weatherapi.com/weather/64x64/day/350.png" },
        80: { text: "Slight rain showers", icon: "https://cdn.weatherapi.com/weather/64x64/day/353.png" },
        81: { text: "Moderate rain showers", icon: "https://cdn.weatherapi.com/weather/64x64/day/356.png" },
        82: { text: "Violent rain showers", icon: "https://cdn.weatherapi.com/weather/64x64/day/359.png" },
        95: { text: "Thunderstorm", icon: "https://cdn.weatherapi.com/weather/64x64/day/386.png" },
        96: { text: "Thunderstorm with slight hail", icon: "https://cdn.weatherapi.com/weather/64x64/day/386.png" },
        99: { text: "Thunderstorm with heavy hail", icon: "https://cdn.weatherapi.com/weather/64x64/day/395.png" },
    };
    return weatherCodes[code] || { text: "Unknown", icon: "" };
};

export const getCoordinates = async (city) => {
    try {
        const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        if (!response.data.results || response.data.results.length === 0) {
            throw new Error('Location not found');
        }
        return response.data.results[0];
    } catch (error) {
        throw error;
    }
};

export const getWeather = async (lat, lon) => {
    try {
        const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,surface_pressure,visibility&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`
        );

        const data = response.data;

        // Transform Open-Meteo data to match our app's expected structure
        const currentCondition = getWeatherCondition(data.current.weather_code);

        return {
            current: {
                temp_c: data.current.temperature_2m,
                condition: currentCondition,
                humidity: data.current.relative_humidity_2m,
                feelslike_c: data.current.apparent_temperature,
                wind_kph: data.current.wind_speed_10m,
                cloud: data.current.cloud_cover,
                pressure_mb: data.current.surface_pressure,
                vis_km: data.current.visibility / 1000,
            },
            forecast: {
                hourly: data.hourly.time.slice(0, 24).map((time, index) => ({
                    time: time,
                    temp_c: data.hourly.temperature_2m[index],
                    condition: getWeatherCondition(data.hourly.weather_code[index]),
                })),
                daily: data.daily.time.map((time, index) => ({
                    date: time,
                    day: {
                        maxtemp_c: data.daily.temperature_2m_max[index],
                        mintemp_c: data.daily.temperature_2m_min[index],
                        condition: getWeatherCondition(data.daily.weather_code[index]),
                        uv: data.daily.uv_index_max[index],
                        sunrise: data.daily.sunrise[index],
                        sunset: data.daily.sunset[index],
                    }
                }))
            }
        };
    } catch (error) {
        throw error;
    }
};
