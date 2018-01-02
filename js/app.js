var viewModel = function() {
    var self = this;


// Constructor creates a new map - only senter and zoom are required.
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 37.3998683, lng: -122.1105936},
  zoom: 13,
  //styles: styles,
  mapTypeControl: false
});

}
function startApp() {
  ko.applyBindings(new viewModel());
}
