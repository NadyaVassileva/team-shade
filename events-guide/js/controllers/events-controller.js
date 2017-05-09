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
    
    events.forEach(event => {

        event.favoritesCount = 0;
        event.favoritedByCurrentUser = false;

        if (event.favorites) {
            let users = event.favorites.split(/[ ,]+/);
            
            event.favoritesCount = users.length;
            
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

        let itemID = $this.attr('data-id');

        eventData.findEventById(itemID)
            .then(getResponse => {
                console.log(getResponse);

                if ($this.attr('data-actiontype') === "add") {


                    let updatedEvent = JSON.parse(JSON.stringify(getResponse));

                    if (updatedEvent.favorites) {
                        updatedEvent.favorites += `,${currentUser}`;
                    }
                    else {
                        updatedEvent.favorites = currentUser;
                    }

                    //2. PUT 
                    eventData.updateEventById(itemID, updatedEvent)
                        .then(putResponse => {
                            console.log("PUT RESPONSE");
                            console.log(putResponse);

                            $this
                                .toggleClass('btn-primary')
                                .toggleClass('btn-danger')
                                .attr('data-actiontype', 'remove')
                                .text("Remove from favorites");

                            let countElement = $(('#' + itemID)).find(".data-counter");
                            let newCount = parseInt(countElement.text()) + 1;
                            countElement.text(newCount);

                        }, error => console.log(error));



                }
                else {

                    let updatedEvent = JSON.parse(JSON.stringify(getResponse));

                    if (updatedEvent.favorites.indexOf(("," + currentUser)) > -1) {
                        updatedEvent.favorites = updatedEvent.favorites.replace(("," + currentUser), "");

                    }
                    else {
                        updatedEvent.favorites = updatedEvent.favorites.replace(currentUser, "");

                    }

                    //2. PUT 

                    //IF on the Favorites bar...add class hidden
                    eventData.updateEventById(itemID, updatedEvent)
                        .then(putResponse => {
                            console.log("PUT RESPONSE");
                            console.log(putResponse);
                            console.log(window.location.hash);
                            if (window.location.hash === "#/favorites") {
                                $(('#' + itemID)).addClass("hidden");
                            }
                            else {
                                $this
                                    .toggleClass('btn-primary')
                                    .toggleClass('btn-danger')
                                    .attr('data-actiontype', 'add')
                                    .text("Add to favorites");

                                let countElement = $(('#' + itemID)).find(".data-counter");
                                let newCount = parseInt(countElement.text()) - 1;
                                countElement.text(newCount);
                            }


                        }, error => console.log(error));


                }
            }, error => console.log(error));
    });
}


