import { config, response } from './config';

function getWareHouse() {
    const requestOpstions = {
        method: 'GET'
    };

    return fetch(config.apiURL + '/api/Data/GetWarehouses', requestOpstions).then(response => response.json()
        .then(resJSON => resJSON));
}

export const getInventoryService = {
    getWareHouse
}