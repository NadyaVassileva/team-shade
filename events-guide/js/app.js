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

  this.get('#/', () => this.redirect('#/home'));

  this.get('#/home', homeController.get);

  this.get('#/login', (context) => userLogin(context));

  this.get('#/register', (context) => userRegister(context));

  this.get('#/cinema', (context) => eventsController.loadEventsByCategory(context, 'cinema'));

  this.get('#/sport', (context) => eventsController.loadEventsByCategory(context, 'sport'));

  this.get('#/theater', (context) => eventsController.loadEventsByCategory(context, 'theater'));

  this.get('#/music', (context) => eventsController.loadEventsByCategory(context, 'music'));

  this.get('#/favorites', (context) => eventsController.loadFavoriteEvents(context));

  // this.notFound TO BE IMPLMENTED


});

sammyApp.run('#/');
