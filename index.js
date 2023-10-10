import {getRequest} from './request.js';
import {render} from './render.js';
import {checkName, addCity, createElement, cleaningDom, cities} from './addcity.js';
import {renderFavorites, heartActive, heartNotActive} from './addFavorites.js';
import {parseLocalStorage, currentLocalStorage, saveToCookie} from './localStorage.js';

const MASSGES = {
    REPEAT_ERROR: "Эта задача уже есть в списке",
    STATUS_ERROR: "Введите верный статус",
    PRIORITY_ERROR: "Введите верный приоритет",
    ADDING_ERROR: "Нельзя удалить того чего нет",
    STATUS_CHANGE_ERROR: "Нельзя поменять статус того чего нет",
}




parseLocalStorage()
renderFavorites()


const form = document.querySelector('.weather__form');

async function currentCityRequest () {  
  try {
    const cityCookie = document.cookie;
    const data = await getRequest(cityCookie.split('=')[1]);
    render(data)
    if (checkName(data.city.name)) {
      heartActive()
    } else if (!checkName(data.city.name)) {
      heartNotActive()
    }
  } catch (error) {
    console.log(error);
  }
}

currentCityRequest()



export async  function formListener (event) {
    event.preventDefault();
    const inputCity = document.querySelector('.weather__input').value;
    try {
      const data = await getRequest(inputCity) ;
      currentLocalStorage(data.city.name);
      saveToCookie(data.city.name)
      render(data)
      if (checkName(data.city.name)) {
        heartActive()
      } else if (!checkName(data.city.name)) {
        heartNotActive()
      }
    } catch (error) {
      console.log(error);
    }

    document.querySelector('.weather__input').value = '';
}

const heart = document.getElementById('img-favor');

function heartClickHandler(event) {
  event.preventDefault();
  addCity(document.querySelector('.visual-left__city').textContent);
  
  for (const favorite of cities) {
    console.log(favorite)
  }

  cleaningDom();
  renderFavorites();
  heartActive()
}



heart.addEventListener('click', heartClickHandler);


form.addEventListener('submit', formListener)









