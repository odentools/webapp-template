/**
 * Routes for /api/articles
 */

var express = require('express');
var router = express.Router();

// Example articles
var exampleArticles = [
	{
		title: 'Hello, World',
		content: 'Hi! This is an example article by OdenTools.'
	}
];


/**
 * GET /api/articles - Get a list of the articles
 * @param  {Object} req Request object - http://expressjs.com/ja/api.html#req
 * @param  {Object} res Response object - http://expressjs.com/ja/api.html#res
 */
router.get('/', function (req, res) {

	// Get the articles & Send a response
	res.send({
		articles: exampleArticles
	});

});


/**
 * POST /api/articles - Add the article
 * @param  {Object} req Request object - http://expressjs.com/ja/api.html#req
 * @param  {Object} res Response object - http://expressjs.com/ja/api.html#res
 */
router.post('/', function (req, res) {

	var title = req.body.title || null;
	var content = req.body.content || null;
	if (title == null || content == null) {
		res.status(400).send('title or content parameter was required.');
		return;
	}

	console.log('New article was created');

	var article_data = {
		title: title,
		content: content
	};

	// Add the article
	exampleArticles.push(article_data);

	// Send a response
	res.send({
		article: article_data
	});

});


/**
 * GET /api/articles/:id - Get the article as single
 * @param  {Object} req Request object - http://expressjs.com/ja/api.html#req
 * @param  {Object} res Response object - http://expressjs.com/ja/api.html#res
 */
router.get('/:id', function (req, res) {

	var article_id = req.params.id;
	if (exampleArticles[article_id] == null) {
		res.sendStatus(404);
		return;
	}

	// Get the article
	var article_data = exampleArticles[article_id];

	// Send a response
	res.send({
		article: article_data
	});

});


/**
 * DELETE /api/articles/:id - DELETE the article
 * @param  {Object} req Request object - http://expressjs.com/ja/api.html#req
 * @param  {Object} res Response object - http://expressjs.com/ja/api.html#res
 */
router.delete('/:id', function (req, res) {

	var article_id = req.params.id;
	if (exampleArticles[article_id] == null) {
		res.sendStatus(404);
		return;
	}

	// Delete the article
	var article_data = exampleArticles[article_id];
	exampleArticles.splice(article_id, 1);

	console.log('Article %d was deleted', article_id);

	// Send a response
	res.send({
		article: article_data
	});

});


// ----

module.exports = router;
