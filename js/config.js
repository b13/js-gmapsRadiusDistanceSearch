require.config({
	paths: {
		jquery: "../bower_components/jquery/dist/jquery",
		requirejs: "../bower_components/requirejs/require",
		underscore: "../bower_components/underscore/underscore",
		gmaps: "../bower_components/gmaps/gmaps"
	},
	shim: {

	},
	packages: [

	]
});

require(['main'], function(){ });