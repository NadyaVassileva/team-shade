import * as data from 'data';
import * as templateLoader from 'templateLoader';
import * as eventData from 'eventsData';
import { kinveyFindEvents, kinveyFindEventsByCategory } from 'data';


// to be updated
class EventController {
    constructor(eventsData, templates) {
        this.eventsData = eventsData;
        this.temlpates = templates;
    }
}


export function loadFavoriteEvents(context) {
    // loadAllEvents(context); WORKING

    //TODO if sessionStorage is empty
    //redirect to Login!

    eventData.findAllEvents()
        .then(response => {
            let currentUser = sessionStorage.getItem('currentUser');
            let commaDelimitedSearchString = currentUser + ',';

            let favoriteEvents = response.filter(event => {
                if (event.favorites !== null &&
                    event.favorites.indexOf(commaDelimitedSearchString) > -1) {

                    return true;
                }
                else {
                    return false;
                }

            });
            console.log(favoriteEvents);

            //TEMPLATE
            templateLoader.generate('events')
                .then(template => {
                    let events = favoriteEvents;

                    context.$element().html(template({ events }));
                    $('#events-table').click((event) => {
                        console.log(event.target);
                    });


                }, error => {
                    console.log(error);
                });


        }, error => {
            console.log(error);
        });
}

export function loadAllEvents(context) {
    eventData.findAllEvents()
        .then(response => {
            templateLoader.generate('events')
                .then(template => {
                    let events = response;

                    context.$element().html(template({ events }));
                    $('#events-table').click((event) => {
                        console.log(event.target);
                    });


                }, error => {
                    console.log(error);
                });
        });
}

export function loadEventsByCategory(context, filter) {
    eventData.findEventsByCategory(filter)
        .then(response => {
            templateLoader.generate('events')
                .then(template => {
                    let events = response;

                    context.$element().html(template({ events }));
                    $('#events-table').click((event) => {
                        console.log(event.target);
                    });


                }, error => {
                    console.log(error);
                });
        });
}


