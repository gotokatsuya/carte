$(document).ready(function () {

  var map;
  var marker;
  var geocoder;
  var circle;
 
  if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(
    function( position )
    {
      var data = position.coords;

      var lat = data.latitude;
      var lng = data.longitude;

      $("#latitude").val(lat);
      $("#longitude").val(lng);
        
      var center = new google.maps.LatLng(lat,lng);

      var mapOptions = {
        zoom: 12,
        center: center
      };

      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map
      });

      geocoder = new google.maps.Geocoder();

      circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: center,
        radius: 3000
      });

    },
    function( err )
    {
      console.log(err);

      var center = new google.maps.LatLng(35.681298,139.766247);

      var mapOptions = {
        zoom: 12,
        center: center
      };

      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      
      marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map
      });

      geocoder = new google.maps.Geocoder();

      circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: center,
        radius: 3000
      });
    },
    {
      "enableHighAccuracy": false,
      "timeout": 6000,
      "maximumAge": 180000,
    });
  }

  
  $("#geocode").click(function(){
    
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