var marker;

function initGameMap(listener) {
  const haightAshbury = { lat: 37.769, lng: -122.446 };
  const moscow = { lat: 37.769, lng: -122.446 }
    let map = new google.maps.Map(document.getElementById("game_map"), {
        zoom: 12,
        center: haightAshbury,
        mapTypeId: "hybrid",
        disableDefaultUI: true,
    });

  google.maps.event.addListener(map, "click", function (event) {
      latLng = event.latLng;

      if (marker && marker.setMap) {
          marker.setMap(null);
      }
      marker = new google.maps.Marker({
          position: latLng,
          map: map,
          Clickable: false,
      });
      getCoordinates(latLng)
  });

    
  panorama = new google.maps.StreetViewPanorama(
      document.getElementById("game_panorama"),{
      position: moscow,
      pov: {heading: 34, pitch: 10,},
      addressControl: false,
      enableCloseButton: false,
      });
    
  map.setStreetView(panorama);     
}


function getCoordinates(location){
    const coordinates = location
    alert(location)
}

