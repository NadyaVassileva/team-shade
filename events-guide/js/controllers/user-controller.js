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

export function userRegister(context) {
    generate('register')
        .then( template => {
            context.$element().html(template());
            $('#signup-form').on('submit', function(event) {
                event.preventDefault();

          let userInfo = {
            username: $('#username').val(),
            password: $('#password').val(),
            firstname: $('#firstname').val(),
            lastname: $('#lastname').val()
        };
            data.app.signup(event, userInfo)
            });
        }, error => {
            console.log(error);
        });
}

