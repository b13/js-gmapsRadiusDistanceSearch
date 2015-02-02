/*!
 *  viewMap Backbone View
 *
 *  Author: Daniel Sattler
 *  © 2015 b:dreizehn GmbH, Stuttgart
 *
 *  this view is used to handle the gyms and stores on the google maps
 *
 */

define([
	"jquery"
	, "underscore"
	, "gmaps"
], function(_) {

	return (function maps(opts) {

		var
			me  = this
			, s = {
				collection: {}
				, gmapsOpts: {
					div: '#bJS_googleMap'
					, zoom: 6
					, minZoom: 4
					, lat: 51.1642292
					, lng: 10.4541194
				}
			}
			, geocoder = new google.maps.Geocoder();

		function initialize() {

				// extend options
			s.gmapsOpts = $.extend(s.gmapsOpts, opts);

			return me;
		}


			/**
			 * init map
			 */
		me.initMap = function() {
			me.map = $.extend(me.map, new window.GMaps(s.gmapsOpts));
		};


			 /**
			  * get geo code by address
			  *
			  * @param address search string
			  * @returns {*}
			  */
		me.getGeoCodeByAddress = function(address) {
			var defer = new $.Deferred();

			this.geocoder.geocode({
				'address': address
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					defer.resolve(results[0]);
				}
			});

			return defer.promise();
		};


			/**
			 * get collection
			 * @returns {*}
			 */
		me.getCollection = function() {
			return s.collection;
		};


			/**
			 * radius distance search
			 *
			 * @param marker
			 * @param distanceRadius
			 * @returns {Array}
			 */
		me.radiusDistanceSearch = function(marker, distanceRadius) {
			var
				startPosition = marker.getPosition()
				, markerMatchSearch = [];

			_.each(s.collection, function(model) {
				var
					distancePosition = model.get('marker').getPosition()
					, distance = Math.ceil(google.maps.geometry.spherical.computeDistanceBetween(startPosition, distancePosition)/1000);

				if (distance <= distanceRadius) {
					markerMatchSearch.push(model);
				}
			});

			return markerMatchSearch;
		};


		return initialize();
	});
});