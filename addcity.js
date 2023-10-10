import {render} from './render.js';
import {renderFavorites, heartActive, heartNotActive} from './addFavorites.js';
import {getRequest} from './request.js';
import {saveLocalStorage, currentLocalStorage,saveToCookie} from './localStorage.js';

// export const cities = [];

export const cities = new Set();

// const MASSGES = {
//     REPEAT_ERROR: "Эта задача уже есть в списке",
//     STATUS_ERROR: "Введите верный статус",
//     PRIORITY_ERROR: "Введите верный приоритет",
//     ADDING_ERROR: "Нельзя удалить того чего нет",
//     STATUS_CHANGE_ERROR: "Нельзя поменять статус того чего нет",
// }


export function checkName(сity) {
    let checkName = cities.has(сity)
    return checkName
}

export function addCity(сity) {
    cities.add(сity)

    saveLocalStorage()
}

export function createElement(city) {
    const newShell = document.createElement('li'); 
    const newDiv = document.createElement('div'); 
    // const citiesList = document.querySelector(`.cities__list`);
    const newIcon = document.createElement('img');

    newIcon.setAttribute('src', 'img/close-icon.svg');
    newIcon.className = 'cities__icon';
    newShell.className = 'cities__item';
    newDiv.textContent = city;

    newIcon.addEventListener("click", function delFavorite () {
        cities.delete(city)
        heartNotActive()
        cleaningDom()
        renderFavorites()
        saveLocalStorage()
    })

    newDiv.addEventListener("click", async function getRequestCity () {
        // getRequest(city)
        try {
            const data = await getRequest(city) ;
            render(data)
            currentLocalStorage(data.city.name)
            saveToCookie(data.city.name)
          } catch (error) {
            console.log(error);
          }
        await heartActive()
    })

    newShell.appendChild(newIcon);
    newShell.appendChild(newDiv);
    return newShell
}




export function cleaningDom () {
    

    
    // тут переписано на рекурсию
    let obj=document.querySelectorAll('.cities__item');
    let n = obj.length;
	// for(let i = 0; i < obj.length; i++) {
	// 	obj[i].remove();
	// }
    if (n === 0) {
        return
    } else {
        n--;
        obj[n].remove();
        cleaningDom ();
    }
    
}

