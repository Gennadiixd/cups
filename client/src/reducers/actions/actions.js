import {
    ADD_COORDINATE,
    DEL_TASK_FROM_REDUCER,
    ADD_TASK_TO_USER_REDUCER,
    DEL_TASK_FROM_USER_REDUCER, ADD_TASK_TO_REDUCER
} from './actionTypes'
import { LOGOUT_USER, LOGIN_USER } from './actionTypes'

export const addCoordinateAC = (coordinates, title, description, addressId, mapCenter) => ({
    type: ADD_COORDINATE,
    payload: {
        id: addressId,
        coordinates: coordinates,
        title: title,
        description: description,
        mapCenter: mapCenter ? mapCenter : coordinates,
    }
})

//Удаляет задание из стора с тасками
export const delTaskFromReducerAC = (id) => ({
    id: id,
    type: DEL_TASK_FROM_REDUCER,
})
//Добавляет задание в стор юзера
export const addTaskToUserReducerAC = (task) => ({
    task: task,
    type: ADD_TASK_TO_USER_REDUCER
})
//достаёт API ключ из файла
async function getAPIKey() {
    let res = await fetch('/key');
    let APIKey = res.text()
    return APIKey;
}

//Запрос к базе, получение всех меток, сохранение их в сторе.
export const placeMarksOnMapAC = (data) => {
    return async (dispatch) => {
        let res = await fetch("/tasks/getall");
        let data = await res.json();
        for (let i = 0; i < data.length; i++) {
            dispatch(addCoordinateAC(data[i].coordinates[0], data[i].title, data[i].description, data[i]._id, [55.751574, 37.573856]))
        }
    }
}

//получаем координаты из яндекса по API Яндекса по аддресу
export const fetchCoordinatesAC = (address, title, description, expDate, author) => {
    return async (dispatch) => {
        if (typeof (address) == "string") {
            const APIkey = await getAPIKey();
            let res = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${APIkey}&format=json&geocode=Москва ${address}`)
            let data = await res.json();
            address = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
            address = address.split(' ');
            address = address.reverse()

        }
        let long = Number(address[0]);
        let lat = Number(address[1])
        let arrayWithCoordinates = [long, lat];
        console.log(arrayWithCoordinates)
        let resp = await fetch('/tasks/savetask', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ arrayWithCoordinates, title, description, expDate, author }),
        });
        let data1 = await resp.json();
        dispatch(addCoordinateAC(arrayWithCoordinates, title, description, data1.id));

    }
}

//Логика *взять задание
export const takeTaskAC = (id, task) => {
    return async (dispatch) => {
        //удалить из редьюсера тасков
        await dispatch(delTaskFromReducerAC(id))
        //добавить в редьюсер пользователя
        await dispatch(addTaskToUserReducerAC(task))
    }
}

//Логика *отказаться от задания
export const delTaskAC = (id, task) => {
    return (dispatch) => {
        //удалить из редьюсера пользователя
        dispatch(delTaskFromUserAC(id));
        //добавить в редьюсер тасков
        dispatch(addTaskToReducerAC(task));
    }
}

export const delTaskFromUserAC = id => ({type: DEL_TASK_FROM_USER_REDUCER, taskid : id});
export const addTaskToReducerAC = task => ({
    type: ADD_TASK_TO_REDUCER,
    payload: {
        id: task._id,
        coordinates: [Number(task.coordinates[0][0]), Number(task.coordinates[0][1])],
        title: task.title,
        description: task.description,
        mapCenter: [55.751574, 37.573856]
    }
});

//Авторизация
export const userLogin = (user, tasks) => ({ type: LOGIN_USER, user: user, tasks: tasks });
export const userLogout = () => ({ type: LOGOUT_USER });

export const  convertCoordinatesToAddressAC = async (coordinates) => {    
        const APIkey = await getAPIKey();
        let res = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${APIkey}&format=json&geocode=` + coordinates[1] +' '+ coordinates[0])
        let data = await res.json();       
        return data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text ;   
}
