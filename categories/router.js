const Express = require('express');
var router = Express.Router();

var getCategories = require('./categories.get.js');
var postCategories = require('./categories.post.js');
var deleteCategories = require('./categories.delete.js');
var putCategories = require('./categories.put.js');

// GET Requests
router.get('/', function(req, res) {
	getCategories.getCategories(req, res);
});

router.get('/:id', function(req, res) {
	getCategories.getCategory(req, res);
});

// POST Requests
router.post('/', function(req, res) {
	postCategories.addCategory(req, res);
});

// DELETE Requests
router.delete('/:id', function(req, res) {
	deleteCategories.removeCategory(req, res);
});

//PUT Requests
router.put('/:id', function(req, res) {
	putCategories.updateCategory(req, res);
});


module.exports = router;