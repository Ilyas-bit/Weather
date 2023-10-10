import {createElement, cities} from './addcity.js';

const favoritesIcon = document.querySelector('.icon__add-favor')


const listFavorites = document.querySelector('.cities__list')

export function renderFavorites() {
    
    for (const favorite of cities) {
        listFavorites.append(createElement(favorite))
    }
}



const heart = document.getElementById('img-favor');

export function heartActive() {
    heart.className = 'icon__add-favor-red';
}  

export function heartNotActive() {
    heart.className = 'icon__add-favor';
}