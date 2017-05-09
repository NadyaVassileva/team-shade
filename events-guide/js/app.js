import 'jquery';
import Sammy from 'sammy';
import * as template from 'templateLoader';
import * as homeController from 'homeController';
import { userLogin, userLogout, userRegister } from 'userController';

import * as eventsController from 'eventsController';
import { kinveyLoadEventsByCategory } from 'eventsController';

import { app } from 'data';

import * as eventHandlers from 'eventHandlers';
import { helper } from 'helper';


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

  this.get('#/register', function (context) {
    userRegister(context);
  });

  this.get('#/cinema', function (context) {
    eventsController.loadEventsByCategory(context, 'cinema');
  });

  this.get('#/sport', function (context) {
    eventsController.loadEventsByCategory(context, 'sport');
  });

  this.get('#/theater', function (context) {
    eventsController.loadEventsByCategory(context, 'theater');
  });

  this.get('#/music', function (context) {
    eventsController.loadEventsByCategory(context, 'music');
  });

  this.get('#/favorites', function (context) {
    eventsController.loadFavoriteEvents(context);
  });

  // this.notFound TO BE IMPLMENTED

  $('#logout-button').on('click', function (event) {
    event.preventDefault();
    Kinvey.User.logout()
      .then(response => {

        helper.removeUserButtons();

        sessionStorage.clear();
        window.location.hash = "#/login";
      });
  });
});

sammyApp.run('#/');
