import { ADD_COORDINATE } from './actionTypes'
import {LOGOUT_USER, LOGIN_USER} from './actionTypes'

let nextPlaceId = 0
export const addCoordinateAC = (coordinates, title, description, adressId, mapCenter) => ({
    type: ADD_COORDINATE,
    payload: {
        id: adressId,
        coordinates: coordinates,
        title: title,
        description: description,
        mapCenter: mapCenter ? mapCenter : coordinates,
    }
})

async function getAPIKey() {
    let res = await fetch('/key');
    let APIKey = res.text()
    return APIKey;
}

export const fetchCoordinatesAC = (adress, title, description, expDate) => {
    return async (dispatch) => {
        const APIkey = await getAPIKey();
        let res = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${APIkey}&format=json&geocode=Москва ${adress}`)
        let data = await res.json();
        let coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
        coordinates = coordinates.split(' ')
        let long = Number(coordinates[0]);
        let lat = Number(coordinates[1])
        let arrayWithCoordinates = [lat, long];

        res = await fetch('/tasks/savetask', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ arrayWithCoordinates, title, description, expDate }),
        });
        data = await res.text();

        //console.log(arrayWithCoordinates, title, description, expDate, data)

        dispatch(addCoordinateAC(arrayWithCoordinates, title, description , data));
    }
}

//Авторизация
export const userLogin = (n,r) => ({type : LOGIN_USER, payload : {name : n, role : r}});
export const userLogout = () => ({type : LOGOUT_USER});