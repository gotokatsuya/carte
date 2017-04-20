$(document).ready(function () {

  var center = new google.maps.LatLng(35.681298, 139.766247);

  var mapOptions = {
    zoom: 12,
    center: center
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

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

  var marker = new google.maps.Marker({
    position: map.getCenter(),
    draggable: true,
    map: map
  });
  marker.addListener("drag", function () {
    circle.setCenter(marker.getPosition());
  });

  google.maps.event.addListener(map, 'click', function (event) {
    marker.setPosition(event.latLng);
    circle.setCenter(marker.getPosition());
  });

  var geocoder = new google.maps.Geocoder();

  var lookSearchHint = false;
  var searchHint = $("#search-hint");

  $("#search").click(function () {

    var address = $("#address").val();
    if (address.length == 0) {
      alert("住所や地名を入力してください")
      return;
    }
    var radius = $("#radius").val();
    if (radius.length == 0) {
      alert("円の半径を入力してください");
      return;
    }
    circle.radius = parseInt(radius);

    geocoder.geocode({
      'address': address
    }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var loc = results[0].geometry.location;
        map.setCenter(loc);
        marker.setPosition(loc);
        circle.setCenter(marker.getPosition());

        if (!lookSearchHint) {
          searchHint.show('normal');
          setTimeout(function () {
            searchHint.hide('slow');
          }, 3000);
          lookSearchHint = true
        }

      } else {
        alert("範囲の検索に失敗しました")
        console.log(result)
        console.log(status)
      }
    });
  });

});