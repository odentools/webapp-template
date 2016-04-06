/**
 * Main Script for Frontend Application
 */

'use strict';

angular.module('MyApp', ['ngMaterial'])

.config(function($mdThemingProvider) {

	// Theme setting for Angular Material
	$mdThemingProvider.theme('default')
	.primaryPalette('light-green')
	.accentPalette('red')
	.backgroundPalette('grey');

})


// Controller for main
.controller('MainCtrl', ['$scope', '$window', function($scope, $window) {

	var MESSAGES = [
		'Hello, World',
		'Good morning',
		'Good afternoon',
		'Bye'
	];
	$scope.myMessage = MESSAGES[0];


	/**
	 * Say hello
	 */
	$scope.sayHello = function() {

		$window.alert('Hello!');

	};


	/**
	 * Change the message
	 */
	$scope.changeMessage = function() {

		var message_id = Math.floor(Math.random() * MESSAGES.length);
		$scope.myMessage = MESSAGES[message_id];

	};


}])


// ----

;
