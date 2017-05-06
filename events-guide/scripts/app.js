import 'jquery';
import Sammy from 'sammy';

import templates from 'templateLoader';

var sammyApp = Sammy('#container', function () {
  let $container = $('#container');
  this.get('#/', function () {
    this.redirect('#/home');
  });

  //need to refactor to controllers
  this.get('#/home', function () {
    templates.load('home')
      .then(function (templateHtml) {
        $container.html(templateHtml);
      });
  });

  this.get('#/cinema', () => {
    console.log("CINEMA");
  });

  this.route('#/login', function () {
    console.log("login");
    templates.load('login')
      .then(function (templateHtml) {
        $container.html(templateHtml);
      });
  });

  this.get('#/login', function () {
    templates.load('login')
      .then(function (templateHtml) {
        $container.html(templateHtml);
      });
  });

});

sammyApp.run('#/');
