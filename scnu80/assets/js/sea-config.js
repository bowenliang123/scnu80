// sea-config.js
seajs.config({
	alias: {
		'jquery': '/js/jquery/jquery-2.0.3.min.js',
		'bootstrap': '/js/bootstrap/bootstrap.min.js',
		'jquery.cookie': '/js/jquery.cookie.js',
		'mustache': '/js/mustache.js',
		'jquery.mustache': '/js/jquery.mustache.js'
	},

	preload: [
		'jquery',
		'bootstrap'
	]

});