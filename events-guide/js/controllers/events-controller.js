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

            let events = addResponseMetaData(response);
            let favoriteEvents = events.filter(event => event.favoritedByCurrentUser);
            let currentUser = sessionStorage.getItem('currentUser');

            if (favoriteEvents.length > 0) {
                templateLoader.generate('events')
                    .then(template => {
                        let events = favoriteEvents;

                        context.$element().html(template({ events }));
                        addListenersToButtons(events);


                    }, error => {
                        console.log(error);
                    });
            }
            else {
                templateLoader.generate('nofavorites')
                    .then(template => {
                        context.$element().html(template({ user: currentUser }));
                    }, error => {
                        console.log(error);
                    });
            }



        }, error => {
            console.log(error);
        });
}

export function loadAllEvents(context) {
    eventData.findAllEvents()
        .then(response => {
            templateLoader.generate('events')
                .then(template => {
                    let events = addResponseMetaData(response);
                    console.log(events);

                    context.$element().html(template({ events }));
                    addListenersToButtons(events);


                }, error => {
                    console.log(error);
                });
        });
}


function addResponseMetaData(response) {
    let events = response;
    let currentUser = sessionStorage.getItem('currentUser');
    //favorited by currentUSer
    events.forEach(event => {

        event.favoritesCount = 0;
        event.favoritedByCurrentUser = false;

        if (event.favorites) {
            let users = event.favorites.split(/[ ,]+/);
            //FIRST PROPERTY
            event.favoritesCount = users.length;
            //SECOND PROPERTY
            if (users.indexOf(currentUser) > -1) {
                event.favoritedByCurrentUser = true;
            }

        }
    });

    return events;

}

export function loadEventsByCategory(context, filter) {
    eventData.findEventsByCategory(filter)
        .then(response => {
            templateLoader.generate('events')
                .then(template => {
                    // let events = response;
                    //REFACTORED !!!
                    let events = addResponseMetaData(response);
                    console.log(events);

                    context.$element().html(template({ events }));

                    addListenersToButtons(events);

                }, error => {
                    console.log(error);
                });
        });
}

function addListenersToButtons(events) {
    $('.saveButton').click((ev) => {
        let $this = $(ev.target);
        let currentUser = sessionStorage.getItem('currentUser');

        //1. GET ZAQVKA
        let itemID = $this.attr('data-id');

        eventData.findEventById(itemID)
            .then(getResponse => {
                console.log(getResponse);

                if ($this.attr('data-actiontype') === "add") {

                    //trqbva ni promise
                    let updatedEvent = JSON.parse(JSON.stringify(getResponse));
                    updatedEvent.location = updatedEvent.location + " NOV EXTENSION";

                    //2. PUT ZAQVKA ZA SLAGANE
                    eventData.updateEventById(itemID, updatedEvent)
                        .then(putResponse => {
                            console.log("PUT RESPONSE");
                            console.log(putResponse);
                            //kogato e gotovo THEN
                            $this
                                .toggleClass('btn-primary')
                                .toggleClass('btn-danger')
                                .attr('data-actiontype', 'remove')
                                .text("Remove from favorites");

                        }, error => console.log(error));



                }
                else {

                    //2. PUT ZAQVKA ZA MAHANE                    
                    //trqbva ni promise

                    $this
                        .toggleClass('btn-primary')
                        .toggleClass('btn-danger')
                        .attr('data-actiontype', 'add')
                        .text("Add to favorites");
                }
            }, error => console.log(error));
        // console.log(itemID);

    });
}


