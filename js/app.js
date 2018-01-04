// Declare global variables.
var map;
//var bounds;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.3998683, lng: -122.1105936},
    zoom: 13,
    //styles: styles,
    mapTypeControl: false
  });

  ko.applyBindings(new viewModel());

}

var Location = function(data) {
  var self = this;
  var defaultIcon = makeMarkerIcon('0091ff');

  this.title = data.title;
  //this.lat = data.lat;
  //this.lng = data.lng;
  this.position = data.location;
  this.street = "";
  this.city = "";

  // All the location markers are initially visible.
  // Visibility is subject to change using a filter.
  this.visible = ko.observable(true);

  // Create a marker for the location.
  this.marker = new google.maps.Marker({
    //position: data.location,
    position: this.position,
    title: this.title,
    icon: defaultIcon,
    map: map,
    animation: google.maps.Animation.DROP,
    infoWindow: new google.maps.InfoWindow({
      content: self.title + 'Marker Description'
    }),
   });

   // Create an information window for the location.
   //this.infoWindow = new google.maps.InfoWindow({
    // content: self.title + 'Marker Description'
  // });

   // Show filtered markers (initially all the markers are shown).
   this.showMarker = ko.computed(function() {
     if (this.visible() === true) {
       this.marker.setMap(map);
     } else {
       this.marker.setMap(null);
     }
     return true
   }, this);

   // When a marker is clicked, open the information window
   // and bounce a marker one time.
   this.marker.addListener('click', function() {
     //self.contentString = 'Marker Description';
     //self.infoWindow.setContent('dfhj');
     console.log(self.infoWindow);
     self.marker.infoWindow.open(map, this);
     self.marker.setAnimation(google.maps.Animation.BOUNCE);
     setTimeout(function() {
       self.marker.setAnimation(null);
     }, 750);
   });

   // When a name in the list view is clicked,
   // open the information window for the associated marker.
   this.listClicked = function() {
     google.maps.event.trigger(self.marker, 'click');
   };

};

var viewModel = function() {
    var self = this;

    this.locationList = ko.observableArray([]);

    // Populate the list view.
    locations.forEach(function(locationName) {
      self.locationList.push( new Location(locationName) );
    });


}
//function startApp() {
  //ko.applyBindings(new viewModel());
//}


// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}

/*function setMarkers() {
  var defaultIcon = makeMarkerIcon('0091ff');
  for (var i=0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      //map: map,
      position: position,
      title: title,
      icon: defaultIcon,
      animation: google.maps.Animation.DROP,
      id: i
    });
    console.log('hi');
    markers.push(marker);
  }
}

// This function will loop through the markers array and display them all.
function showMarkers() {
  var bounds = new google.maps.LatLngBounds();
  // // Extend the boundaries of the map for each marker and display the marker.
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}*/
