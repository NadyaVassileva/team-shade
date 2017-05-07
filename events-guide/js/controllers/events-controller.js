import * as data from 'data';
import { generate } from 'templateLoader';

export function loadEvents(context) {
   data.app.findEvents()
   .subscribe(function(events) {
    generate('events')
        .then( template => {
            console.log(events);
            context.$element().html(template({events}));
        }, error => {
            console.log(error);
        })
});
}

export function loadEventsByCategory(context, categoryType) {
   data.app.findEventsByCategory(categoryType)
   .subscribe(function(events) {
    generate('events')
        .then( template => {
            console.log(events);
            context.$element().html(template({events}));
        }, error => {
            console.log(error);
        })
});
}

