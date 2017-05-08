import 'jquery';
import Sammy from 'sammy';
import * as template from 'templateLoader';
import * as homeController from 'homeController';
import { userLogin, userLogout } from 'userController';

import { loadEvents, loadEventsByCategory } from 'eventsController';
import { kinveyLoadEventsByCategory } from 'eventsController';

import { app } from 'data';

import * as eventHandlers from 'eventHandlers';

eventHandlers.loadAll();

var sammyApp = Sammy('#container', function () {
  let $container = $('#container');

  this.get('#/', function () {
    this.redirect('#/home');
  });

  this.get('#/home', homeController.get);

  this.get('#/login', function (context) {
    userLogin(context);
  });

  this.get('#/cinema', function (context) {
    //loadEvents(context);
    loadEventsByCategory(context, 'cinema');
  });

  this.get('#/sport', function (context) {
    //loadEvents(context);
    loadEventsByCategory(context, 'sport');
  });

  // to ask if it's acceptable for the project
  // this.get('#/sport', function (context) {
  //     kinveyLoadEventsByCategory(context, 'sport');
  // });

  // this.get('#/music', function (context) {
  //     kinveyLoadEventsByCategory(context, 'music');
  // });

  $('#logout-button').on('click', function (event) {
    event.preventDefault();
    Kinvey.User.logout()
      .then(response => {
        $('#logout-button').addClass('hidden');
        $('#login-button').removeClass('hidden');

        sessionStorage.clear();
        window.location.hash="#/login";

        //need to redirect to home
        console.log("User is logged out!!!");
      });
  });

});

sammyApp.run('#/');
