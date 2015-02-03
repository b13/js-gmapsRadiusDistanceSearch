var B = B || {};

define("main", [
	"jquery"
	, "underscore"
], function($, _) {

		// will be called on document ready
	function initialize() {
		B.map = new initMap();
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

				var collection = [{
					latitude:"51.11749500000000"
					, longitude:"7.39877300000000"
				},
				{
					latitude:"52.52214000000000"
					, longitude:"8.19737900000000"
				},
				{
					latitude:"52.28356100000000"
					, longitude:"7.44814900000000"
				},
				{
					latitude:"51.70039400000000"
					, longitude:"7.46841500000000"
				}];

				me = $.extend(me, new map({collection: collection}));

					// store gmaps reference
				me.gmap = me.initMap({ zoom: 5 });
				addAllMarkerToMap();

				var
					distanceBetweenM0M1    = me.getDistanceBetweenMarker(me.collection[0].marker, me.collection[1].marker)
					, distanceBetweenM0M2  = me.getDistanceBetweenMarker(me.collection[0].marker, me.collection[2].marker)
					, radiusDistanceSearch = me.radiusDistanceSearch(me.collection[0].marker, 100);

				console.log("distance between marker0 and marker1 : " + distanceBetweenM0M1 + "km");
				console.log("distance between marker0 and marker2 : " + distanceBetweenM0M2 + "km");
				console.log("markers inside a 100km distance to marker 0:");
				console.log(radiusDistanceSearch);


				setTimeout(function() {
					console.log("toggle markers by collection");
					me.toggleMarkerByCollection(radiusDistanceSearch)
				}, 3000);


				setTimeout(function() {
					console.log("show all marker");
					me.showAllMarker();
				}, 6000);

			});

			return me;
		}


			/**
			 * add all markers from the collection to the map
			 * and store the marker reference inside the collection
			 */
		function addAllMarkerToMap() {
			_.each(me.collection, function(item) {
				item.marker = me.gmap.addMarker({
					lat: item.latitude
					, lng: item.longitude
				});
			});
		}

		return initialize();
	}



		// document ready
	$(function() {
		initialize();
	});
});