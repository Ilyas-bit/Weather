import {cities} from './addcity.js';


class LocalStorageClass {
  constructor(key) {
      this.key = key;
    }
  set(value, typeStorage) {
    if (typeStorage === "localStorage") {
      if (value === "default") {
        localStorage.setItem(this.key, "lol")
      } else {
        localStorage.setItem(this.key, value)  
      }
    }
    if (typeStorage === "sessionStorage") {
      if (value === "default") {
        localStorage.setItem(this.key, "lol")
      } else {
        sessionStorage.setItem(this.key, value)  
      }
    }
  }
  get() {
    return localStorage.getItem(this.key)
  }
  clear() {
    return localStorage.clear()
  }
  isEmpty() {
    if (localStorage.getItem(this.key) === "null" || "undefined") {
      return true
    }
  }
}

  

export function saveLocalStorage () {

    // Создаем массив из Set
    const filteredArray = Array.from(cities);
    const jsonInput = JSON.stringify(filteredArray);

    localStorage.setItem('cityStorage', jsonInput);
}

export function parseLocalStorage () {
    if (localStorage.cityStorage) {
        let parseCity = JSON.parse( localStorage.getItem('cityStorage') );
        const mySet = new Set(parseCity);
        for (const favorite of mySet) {
            cities.add(favorite)
          }
    } 
}

export function currentLocalStorage (city) {
    localStorage.currentCity = city
}
export function saveToCookie (value) {
    document.cookie = `city=${value}; max-age=3600`;
}