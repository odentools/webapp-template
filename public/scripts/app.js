/**
 * Main Script for Frontend Application
 */

'use strict';

angular.module('MyApp', ['ngMaterial', 'angular-loading-bar'])


/**
 * Configurations
 */

// Configuration for $http service of AngularJS
.config(function ($httpProvider) {

})

// Configuration for Angular Material
.config(function ($mdThemingProvider) {

	// Theme setting for Angular Material
	$mdThemingProvider.theme('default')
	.primaryPalette('light-green')
	.accentPalette('red')
	.backgroundPalette('grey');

})


/**
 * Services
 */

// Service for communication with example api

.factory('ArticlesAPI', function($http) {

	var methods = {};


	/**
	 * Get a list of the articles from WebAPI
	 * @param {Function} callback  Callback function (error_text, articles)
	 */
	methods.getArticles = function(callback) {

		$http.get('/api/articles').then(
			function (res) { // Successful
				callback(null, res.data.articles);
			},
			function (res) { // Failed
				callback(res.data, null);
			}
		);

	};


	/**
	 * Create the new article on WebAPI
	 * @param {String} title Title of article
	 * @param {String} content Content of article
	 * @param {Function} callback  Callback function (error)
	 */
	methods.createArticle = function(title, content, callback) {

		var data = {
			title: title,
			content: content
		};

		$http.post('/api/articles', data).then(
			function (res) { // Successful
				callback(null);
			},
			function (res) { // Failed
				callback(res.data);
			}
		);

	};


	/**
	 * Delete the article from WebAPI
	 * @param {Integer} id ID of article
	 * @param {Function} callback  Callback function (error)
	 */
	methods.deleteArticle = function(id, callback) {

		$http.delete('/api/articles/' + id).then(
			function (res) { // Successful
				callback(null);
			},
			function (res) { // Failed
				callback(res.data);
			}
		);

	};


	return methods;

})


/**
 * Controllers
 */

// Controller for main page
.controller('ArticlesCtrl', ['$scope', '$rootScope', 'ArticlesAPI',
function($scope, $rootScope, ArticlesAPI) {

	// Articles
	$scope.articles = [];

	// ----


	/**
	 * Get the articles from WebAPI
	 */
	$scope.getArticles = function() {

		ArticlesAPI.getArticles(function (err, articles) {

			$scope.articles = articles;

		});

	};


	/**
	 * Delete the article from WebAPI
	 */
	$scope.deleteArticle = function(article_id) {

		ArticlesAPI.deleteArticle(article_id, function (err) {

			// Notify to other controllers
			$rootScope.$broadcast('ARTICLES_UPDATED');

		});

	};


	// ----


	// Get the articles immediately
	$scope.getArticles();


	// Watch for the articles has been updated
	var watch = $rootScope.$on('ARTICLES_UPDATED', function (event, args) {

		// Get the articles now
		$scope.getArticles();

	});


}])



// Controller for Article Editor
.controller('ArticleEditorCtrl', ['$scope', '$rootScope', 'ArticlesAPI',
function($scope, $rootScope, ArticlesAPI) {

	// Article data
	$scope.article = {
		title: null,
		content: null
	};

	// Error information
	$scope.errorText = null;

	// ----


	/**
	* Send an new article to WebAPI
	*/
	$scope.send = function(article) {

		ArticlesAPI.createArticle(article.title, article.content, function (err_text) {

			if (err_text) { // Failed
				$scope.errorText = 'Could not send the article.\n' + err_text;
			} else { // Successful
				$scope.errorText = null;
			}

			// Notify to other controllers
			$rootScope.$broadcast('ARTICLES_UPDATED');

		});

	};


}])



// ----

;
