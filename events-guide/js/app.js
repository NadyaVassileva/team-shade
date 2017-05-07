import 'jquery';
import Sammy from 'sammy';
import * as template from 'templateLoader';
import * as homeController from 'homeController';
import { userLogin } from 'userController';
import { userLogout } from 'userController';
import { app } from 'data';

var sammyApp = Sammy('#container', function () {
  let $container = $('#container');
  this.get('#/', function () {
    this.redirect('#/home');
  });

  //need to refactor to controllers
  this.get('#/home', homeController.get);

  this.get('#/cinema', () => {
    // console.log("CINEMA");
  });

  // this.route('#/login', function () {
  //   template.load('login')
  //     .then(function (templateHtml) {
  //       $container.html(templateHtml);
  //     });
  // });

  this.get('#/login', function (context) {
      userLogin(context);
  });

  $('#logout-button').on('click', function(event) {
      event.preventDefault();
      Kinvey.User.logout()
      .then(response => {
        $('#logout-button').addClass('hidden');
        $('#login-button').removeClass('hidden')
    });
  });

});

sammyApp.run('#/');
