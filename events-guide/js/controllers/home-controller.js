import * as data from 'data';
import * as templateLoader from 'templateLoader';
import * as eventData from 'eventsData';


const $container = $('#container');

export function get(context) {

    if (sessionStorage.length === 0) {

        $("#login-button").trigger("click");
        return;
    }


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

    //if public
    // template.load('home')
    //         .then(templateHTML => {
    //             $container.html(templateHTML);
    //         });

    //user-specific -> 

    // Promise.all([
    //     template.generate("home")
    //     /*,data.getPublicEvents() to be added*/
    // ])
    //     .then(([templateFunction/*, events*/]) => {
    //         $container.html(templateFunction());

    //     });
}