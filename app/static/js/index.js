$(document).ready(function () {

  var center = new google.maps.LatLng(35.681298, 139.766247);
  
  var mapOptions = {
    zoom: 12,
    center: center
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      
  var marker = new google.maps.Marker({
    position: map.getCenter(),
    draggable: true,
    map: map
  });

  var geocoder = new google.maps.Geocoder();

  var circle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: center,
    radius: 3000
  });
  
  $("#search").click(function(){
    
    var address = $("#address").val();
    
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
      
        var loc = results[0].geometry.location;
        map.setCenter(loc);
        marker.setPosition(loc);
        circle.setCenter(loc);
      
        $("#latitude").val(loc.lat());
        $("#longitude").val(loc.lng());
      }
    });
  });

});
