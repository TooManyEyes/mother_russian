var marker;
var round = 1;
let map;

function initGameMap(listener) {
    moscow = { lat: 55.7538594, lng: 37.6206391 }
    map = new google.maps.Map(document.getElementById("game_map"), {
    zoom: 12,
    center: moscow,
    mapTypeId: "roadmap",
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
};


function getCoordinates(location){
    const coordinates = location
    alert(location)
};

var updateRound = function() {
    var round = document.getElementById('round');
    var count = Number(round.innerHTML);
    round.innerHTML = count += 1;
};


//setInterval(updateRound, 20)
