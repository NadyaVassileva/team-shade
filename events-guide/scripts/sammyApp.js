import Sammy from 'sammy';
import $ from 'jquery';
import templates from 'templateLoader';

var sammyApp = Sammy('container', function() {
  let $container = $('#container');
  this.get('#/', function() {
      this.redirect('#/home')
  });
  this.get('#/home', function() {
    templates.load('home')
    .then(function(templateHtml) {
      $container.html(templateHtml);
    })
  });
  this.get('#/login', function() {
    templates.load('login')
    .then(function(templateHtml) {
      $container.html(templateHtml);
    })
  });
    this.get('#/login', function() {
    templates.load('login')
    .then(function(templateHtml) {
      $container.html(templateHtml);
    })
  });
});

sammyApp.run('#/');
