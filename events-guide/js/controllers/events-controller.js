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

export function loadEvents(context) {
    findEvents()
        .then(response => {
            generate('events')
                .then(template => {
                    let events = response;
                    context.$element().html(template({ events }));
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
                    $('#events-table').click((event)=>{
                        console.log(event.target);
                    });


                }, error => {
                    console.log(error);
                });
        });
}




// to ask if it's acceptable for the project
export function kinveyLoadEvents(context) {
    data.app.kinveyFindEvents()
        .subscribe(function (events) {
            generate('events')
                .then(template => {
                    console.log(events);
                    context.$element().html(template({ events }));
                }, error => {
                    console.log(error);
                })
        });
}

export function kinveyLoadEventsByCategory(context, categoryType) {
    data.app.kinveyFindEventsByCategory(categoryType)
        .subscribe(function (events) {
            generate('events')
                .then(template => {
                    console.log(events);
                    context.$element().html(template({ events }));
                }, error => {
                    console.log(error);
                })
        });
}

