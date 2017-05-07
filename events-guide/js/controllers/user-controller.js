import * as data from 'data';
import { generate } from 'templateLoader';

export function userLogin(context) {
    generate('login')
        .then( template => {
            context.$element().html(template());
            $('#login-form').on('submit', function(event) {
                event.preventDefault();
                let username = $('#username').val();
                let password = $('#password').val();

                data.app.login(event, username, password)
            });
        }, error => {
            console.log(error);
        })
}
