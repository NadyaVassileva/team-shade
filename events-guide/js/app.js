import 'jquery';
import Sammy from 'sammy';
import * as template from 'templateLoader';
import * as homeController from 'homeController';
import { userLogin, userLogout } from 'userController';

import { loadEvents, loadEventsByCategory } from 'eventsController';
import { kinveyLoadEventsByCategory } from 'eventsController';

import { app } from 'data';

var sammyApp = Sammy('#container', function () {
  let $container = $('#container');
  this.get('#/', function () {
    this.redirect('#/home');
  });

  //need to refactor to controllers
  this.get('#/home', homeController.get);

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

  $('#logout-button').on('click', function(event) {
      event.preventDefault();
      Kinvey.User.logout()
      .then(response => {
        $('#logout-button').addClass('hidden');
        $('#login-button').removeClass('hidden');

        sessionStorage.clear();


        console.log("User is logged out!!!");
    });
  });

});

sammyApp.run('#/');
