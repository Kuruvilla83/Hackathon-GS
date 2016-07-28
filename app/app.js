'use strict';

/**
 * @ngdoc overview
 * @name gsApp
 * @description
 * # gsApp
 *
 * Main module of the application.
 */
angular
  .module('gsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
	  .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'reportsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
var API_ROOT = "https://ct-staging.hyfnrsx1.com/api/hackathon/";


var token = window.location.toString();
//var val = "21e532f9ccdafb6c9cbb3e6d54251893ad65b9eb68748015f5eb144eeff88d4a"; 


var n = token.includes("#access_token=");
 if(n){
	 var as = token.split("token");
	 var access_token = as[1].replace(/[&\/\\#,+()$~%.'":*?<>{}=]/g, "");	
	 $('#access_token').text(access_token);
	 localStorage.setItem("access_token", access_token);
	 //alert("token : "+ access_token)
 }

//var access_token = "8972a8973aadc22b129f10ecee6f9f0cbe03b1c81547f77030c72dd4e830bf07";
access_token = localStorage.getItem("access_token");
localStorage.setItem("total_pts", total_pts);
total_pts = localStorage.getItem("total_pts");

function logOut(){	
	localStorage.removeItem("access_token");
	window.location.reload();
	}

function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
        $('#sticky').addClass('stick');
        $('#sticky-anchor').height($('#sticky').outerHeight());
    } else {
        $('#sticky').removeClass('stick');
        $('#sticky-anchor').height(0);
    }
}

$(function() {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
});
/*
var dir = 1;
var MIN_TOP = 200;
var MAX_TOP = 350;

function autoscroll() {
    var window_top = $(window).scrollTop() + dir;
    if (window_top >= MAX_TOP) {
        window_top = MAX_TOP;
        dir = -1;
    } else if (window_top <= MIN_TOP) {
        window_top = MIN_TOP;
        dir = 1;
    }
    $(window).scrollTop(window_top);
    window.setTimeout(autoscroll, 100);
}
*/
