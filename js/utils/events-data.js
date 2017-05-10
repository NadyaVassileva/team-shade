import $ from 'jquery';
import { constants } from 'constants';
import * as requester from 'requester';

// return all events
export function findAllEvents() {
    let headers = { 'Authorization': "Kinvey " + sessionStorage.getItem('authToken') };
    let url = `${constants.MAIN_URL}`;
    return requester.get(url, headers);
}

export function findEventsByCategory(filter) {
    let headers = { 'Authorization': "Kinvey " + sessionStorage.getItem('authToken') };
    let url = `${constants.MAIN_URL}?query={"category":"${filter}"}`;
    return requester.get(url, headers);
}

export function findEventsByLocation(filter) {
    let headers = { 'Authorization': "Kinvey " + sessionStorage.getItem('authToken') };
    let url = `${constants.MAIN_URL}?query={"location":"${filter}"}`;
    return requester.get(url, headers);
}

export function findEventById(id) {
    let headers = { 'Authorization': "Kinvey " + sessionStorage.getItem('authToken') };
    let url = `${constants.MAIN_URL}${id}`;
    return requester.get(url, headers);
}

export function updateEventById(id, body) {
    let headers = { 'Authorization': "Kinvey " + sessionStorage.getItem('authToken') };
    let url = `${constants.MAIN_URL}${id}`;
    return requester.put(url, body, headers);
}


/*
 PUT to /appdata/:appKey/:collectionName/:id, lets an app update a previously created entity.

Currently there is no way to pass only the attributes you want changed. 

The entire JSON body is stored as passed in the request body. 
*/

//Auth-Token
//Kinvey 7cf37fbc-9850-48b7-b75d-576212ee36b0.v5mfEZVYrBDJIV1HQVUf2X1+myIaewrnJqVlLnE8RTs=
