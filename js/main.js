define("main", [
	"jquery"
], function($) {

		// will be called on document ready
	function initialize() {
		new initMap();
	}

		/**
		 * init map
		 * @returns {*}
		 */
	function initMap() {
		var
			me = this
			, s = {};

		function initialize() {

			require(['map'], function(map) {
				me = $.extend(me, new map({ zoom: 5 }));

				me.initMap();
			});

			return me;
		}

		return initialize();
	}



		// document ready
	$(function() {
		initialize();
	});
});