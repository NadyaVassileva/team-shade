import 'jquery';
import Sammy from 'sammy';
import * as template from 'templateLoader';
import * as homeController from 'homeController';
import { userLogin } from 'userController';
import { userLogout } from 'userController';

import { loadEvents } from 'eventsController';
import { loadEventsByCategory } from 'eventsController';

import { app } from 'data';

var sammyApp = Sammy('#container', function () {
  let $container = $('#container');
  this.get('#/', function () {
    this.redirect('#/home');
  });

  //need to refactor to controllers
  this.get('#/home', homeController.get);

  // this load all events
  // this.get('#/home', function (context) {
  //     loadEvents(context);
  // });


  // this.route('#/login', function () {
  //   template.load('login')
  //     .then(function (templateHtml) {
  //       $container.html(templateHtml);
  //     });
  // });

  this.get('#/login', function (context) {
      userLogin(context);
  });

  this.get('#/cinema', function (context) {
      loadEventsByCategory(context, 'cinema');
  });

  this.get('#/sport', function (context) {
      loadEventsByCategory(context, 'sport');
  });

  this.get('#/music', function (context) {
      loadEventsByCategory(context, 'music');
  });

  $('#logout-button').on('click', function(event) {
      event.preventDefault();
      Kinvey.User.logout()
      .then(response => {
        $('#logout-button').addClass('hidden');
        $('#login-button').removeClass('hidden');
        console.log("User is logged out!!!");
    });
  });

});

sammyApp.run('#/');
