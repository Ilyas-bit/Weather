import { compareAsc, format } from 'date-fns'


export function render(data) {
    const tempString = document.querySelector('.visual-left__temp');
    const weatherImg = document.querySelector('.visual-left__img');
    const selectedCity = document.querySelector('.visual-left__city');
    const icon = data.list[0].weather[0].icon;

    tempString.textContent = Math.round(data.list[0].main.temp);
    weatherImg.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@4x.png`);
    selectedCity.textContent = data.city.name;

    const feelsLikeTemperature = document.querySelector('.feels-like-temperature');
    const sunriseTime1 = document.querySelector('.sunrise-time-1');
    const sunsetTime1 = document.querySelector('.sunset-time-1');
    feelsLikeTemperature.textContent = Math.round(data.list[0].main.feels_like);
    sunriseTime1.textContent = `${format(new Date(data.city.sunrise * 1000), 'HH:mm')}`
    sunsetTime1.textContent = `${format(new Date(data.city.sunset * 1000), 'HH:mm')}`;

    const temperatureValue = document.querySelectorAll('.different-time-temperature__temperature-value');
    const feelsLikeValue = document.querySelectorAll('.different-time-temperature__feels-like-value');
    const temperatureImage = document.querySelectorAll('.different-time-temperature__image');
    const timeValue = document.querySelectorAll('.different-time-temperature__time-1');


    function renderList (n) {
        // тут переписано на рекурсию
        if (n === 3) {
            return
        } else {
            timeValue[n].textContent = `${format(new Date(data.list[n].dt * 1000), 'HH')}`;
            temperatureValue[n].textContent = Math.round(data.list[n].main.temp);
            feelsLikeValue[n].textContent = Math.round(data.list[n].main.feels_like);
            const temperatureIcon = data.list[n].weather[0].icon;
            temperatureImage[n].setAttribute('src', `https://openweathermap.org/img/wn/${temperatureIcon}@4x.png`);
            renderList (n + 1);
        }
    }
    renderList (0);


}



