import * as data from 'data';
import * as templateLoader from 'templateLoader';
import * as eventData from 'eventsData';
import * as eventController from 'eventsController';


const $container = $('#container');

export function get(context) {

    if (sessionStorage.length === 0) {

        $("#login-button").trigger("click");
        return;
    }

    eventController.loadAllEvents(context);
}