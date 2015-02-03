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
], function($, _) {

	return (function maps(opts) {

		var
			me  = this
			, s = {
				collection: []
				, gmap : {}
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

			if (!_.isUndefined(opts.collection)) {
				s.collection = opts.collection;
			}
			me.collection = s.collection;
			me.gmap = s.gmap;

			return me;
		}


			/**
			 * init map
			 *
			 * @param mapOpts
			 * @returns {Window.GMaps}
			 */
		me.initMap = function(mapOpts) {

				// extend options
			s.gmapsOpts = $.extend(s.gmapsOpts, mapOpts);
			return new window.GMaps(s.gmapsOpts);
		};



			/**
			 * add to collection
			 * @param obj
			 */
		me.addToCollection = function(obj) {

			if (!_.isUndefined(obj.latitude) && !_.isUndefined(obj.latitude)) {
				return false;
			}

			s.collection.push( _.defaults(obj, {
				latitude    : ""
				, longitude : ""
				, marker    : {}})
			);
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
			 * get distance between two markers
			 *
			 * @param marker1
			 * @param marker2
			 * @returns {number}
			 */
		me.getDistanceBetweenMarker = function(marker1, marker2) {
			var
				position1   = marker1.getPosition()
				, position2 = marker2.getPosition();

			return Math.ceil(google.maps.geometry.spherical.computeDistanceBetween(position1, position2)/1000)
		};



			/**
			 * radius distance search
			 *
			 * find all markers inside a given distance radius of a marker and return them as collection
			 *
			 * @param marker
			 * @param distanceRadius
			 * @returns {Array}
			 */
		me.radiusDistanceSearch = function(marker, distanceRadius) {
			var markerMatchSearch = [];

			_.each(s.collection, function(model) {
				if (me.getDistanceBetweenMarker(marker, model.marker) <= distanceRadius) {
					markerMatchSearch.push(model);
				}
			});

			return markerMatchSearch;
		};


		return initialize();
	});
});