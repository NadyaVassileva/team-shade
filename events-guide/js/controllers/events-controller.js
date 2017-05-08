import * as data from 'data';
import { generate } from 'templateLoader';
import { findEvents, findEventsByCategory } from 'eventsData';
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
                })
        });
}
export function loadEventsByCategory(context, filter) {
    findEventsByCategory(filter)
        .then(response => {
            generate('events')
                .then(template => {
                    let events = response;

                    context.$element().html(template({ events }));
                    $('#events-table').click((event)=>{
                        console.log(event.target);
                    });
                    // console.log(context);
                    //Works
                    // context.$element().on('click', function (event) {
                    //     // console.log($);
                    //     let $this = $(event.target);
                    //     if($this.hasClass("btn-primary saveButton")){
                    //      console.log($this.attr('id'));   
                    //     }
                    // });


                }, error => {
                    console.log(error);
                })
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

