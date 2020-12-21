let moscow = {lat: 55.7542524, lng: 37.6207253};
let map;
let panorama;
let userLocations = [];
let userMarkers = [];
let markerFlag = 0;
let markerChosen;
let markerChosenNumb;
let userLocationsDebug = [];

document.addEventListener('click', function (event) {
    let btn = event.target.closest('button');
    if (!btn) return;
    let id = btn.dataset.toggleId;
    if (!id) return;
    let elem = document.getElementById(id);
    elem.hidden = !elem.hidden;
});


function initMap() {
    map = new google.maps.Map(document.getElementById("editor-map"), {
        zoom: 10,
        center: moscow,
        disableDefaultUI: true,
        streetViewControl: true,
        clickableIcons: false,
        mapId: "757ff880503db59",
        gestureHandling: "greedy",
        draggableCursor: 'crosshair'
    });


    panorama = new google.maps.StreetViewPanorama(document.getElementById("editor-panorama"), {
        position: moscow,
        pov: {heading: 120, pitch: 10},
        addressControl: false,
        enableCloseButton: false,
        disableDefaultUI: true,
        showRoadLabels: false,
    });

    panorama.addListener("position_changed", () => {
        if (markerFlag === 2) {
            document.getElementById('delete-location').removeAttribute("disabled")
            document.getElementById('add-location').setAttribute("disabled", "disabled");
            setTimeout(() => {
                markerFlag = 1
            }, 1000);
        } else {
            document.getElementById('delete-location').setAttribute("disabled", "disabled");
            document.getElementById('add-location').removeAttribute("disabled")
        }
    });

    map.setStreetView(panorama);
}


function addLocation() {
    document.getElementById('delete-location').removeAttribute("disabled")
    document.getElementById('add-location').setAttribute("disabled", "disabled");
    userLocations.push(
        panorama.getPosition().toJSON(),
    );
    userLocationsDebug.push(
        panorama.getPosition()
    );
    userMarkers.push(
        new google.maps.Marker({
            position: panorama.getPosition(),
            map,
        })
    )
    markerChosen = userMarkers[userMarkers.length - 1]
    markerChosenNumb = userMarkers.length - 1
    for (let i = 0; i < userMarkers.length; i++) {
        userMarkers[i].addListener("click", function (event) {
            markerChosenNumb = i
            markerChosen = userMarkers[i]
            markerFlag = 2;
            panorama.setPosition(userMarkers[i].getPosition());
        });
    }
    generateMapCode()
}

function delLocation(){
    document.getElementById('delete-location').setAttribute("disabled", "disabled");
    document.getElementById('add-location').removeAttribute("disabled")
    markerChosen.setMap(null);
    userMarkers.splice(markerChosenNumb, 1)
    generateMapCode()
    for (let i = 0; i < userMarkers.length; i++) {
        userMarkers[i].addListener("click", function (event) {
            markerChosenNumb = i
            markerChosen = userMarkers[i]
            markerFlag = 2;
            panorama.setPosition(userMarkers[i].getPosition());
        });
    }
}

function generateMapCode(){
    data = '['
    for (let i = 0; i < userMarkers.length; i++) {
        data += JSON.stringify(userMarkers[i].getPosition()) + ','
    }
    data += ']'
    document.getElementById("locations_count").value = userMarkers.length
    document.getElementById("locations").value = data
}

function validateForm() {
    if( userMarkers.length < 5) {
        alert('Пожалуйста, укажите минимум пять локаций на карте')
        return false;
     } else {
        return true;
     }
}