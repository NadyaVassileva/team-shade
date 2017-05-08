import $ from 'jquery';
import { constants } from 'constants';
import * as requester from 'requester';

// return all events
export function findEvents() {
    let headers = { 'Authorization': "Kinvey " + sessionStorage.getItem('authToken') };
    let url = constants.MAIN_URL;

    return requester.get(url, headers);
                // response.filter(obj => Object.keys(obj)
            //     .some(key => obj[key]
            //      .includes(filter)))
        //}

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
