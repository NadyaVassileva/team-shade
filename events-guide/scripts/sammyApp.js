import Sammy from 'sammy';
import 'jquery'; //importing everything from jquery with side effects
import templates from 'templateLoader';

window.addEventListener("hashchange", () => {
  // console.log(location.hash);
});


var sammyApp = Sammy('container', function () {
  let $container = $('#container');
  // this.get('#/', function() {
  //     this.redirect('#/home');
  // });

  //FIX ME
  //seems that redirect does not triger
  //next get

  //FIX ME
  //Links on the tabs do not trigger as well

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
