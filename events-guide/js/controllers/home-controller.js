import * as data from 'data';
import * as template from 'templateLoader';


const $container = $('#container');

export function get(params) {

    //if public
    template.load('home')
        .then(templateHTML => {
            $container.html(templateHTML);
        });

    //user-specific -> 

    // Promise.all([
    //     template.generate("home")
    //     /*,data.getPublicEvents() to be added*/
    // ])
    //     .then(([templateFunction/*, events*/]) => {
    //         $container.html(templateFunction());

    //     });
}