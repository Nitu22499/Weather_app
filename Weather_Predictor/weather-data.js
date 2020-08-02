export class WeatherData {
    constructor(cityName, description) {
        this.cityName = cityName;
        this.description = description;
        this.temperature = '';
    }
}

export const WEATHER_PROXY_HANDLER = {
    get: function(target, property) {
        return Reflect.get(target, property);
    },
    set: function(target, property, value) {
        const newValue = (value).toFixed(2) + 'C.';
        return Reflect.set(target, property, newValue);
    }
};