let marker;
let round = 1;
let map;
let locationNumber = 0 // Отслеживает какую локацию нужно вывести сейчас
let markerA; // Маркер панорамы
let markerB; //Маркер игрока
let latLngA;
let latLngB;
let line;

function initGameProcess(gameInfo) {
    // let gameMode = gameInfo.get('gameMode');
    // let locations = gameInfo.get('locations');
    // let roundsCount = gameInfo.get('gameCount');
    // let scoreMultiplayer = gameInfo.get('scoreMultiplicator');
    // initGameMap(locations[locationNumber]);
    // while (round < roundsCount) {
    //     continue;
    // }
    latLngA = {lat: 55.7538594, lng: 37.6206391}
    initGameMap({lat: 55.7538594, lng: 37.6206391})
}

// game_mode - это словарь, который передает следующие сведения:
// 1 - название режима игры (gameMode),  2 - список локаций (locations),
// 3 - количество раундов (roundsCount), 4 - модификатор режима игры (scoreMultiplicator)


function initGameMap(latLngA) {
    let moscow = {lat: 55.7538594, lng: 37.6206391}
    map = new google.maps.Map(document.getElementById("game_map"), {
        zoom: 12,
        center: moscow,
        mapTypeId: "roadmap",
        disableDefaultUI: true,
    });

    google.maps.event.addListener(map, "click", function (event) {
        latLngB = event.latLng;
        if (markerB && markerB.setMap) {
            markerB.setMap(null);
        }
        markerB = new google.maps.Marker({
            position: latLngB,
            map: map,
            Clickable: false,
        });
    });

    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("game_panorama"), {
            position: latLngA,
            pov: {heading: 34, pitch: 10,},
            addressControl: false,
            enableCloseButton: false,
        });

    map.setStreetView(panorama);
}


function Confirm() {
    locationNumber += 1
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("game_panorama"), {
            position: moscow,
            pov: {heading: 34, pitch: 10,},
            addressControl: false,
            enableCloseButton: false,
        });
    map.setStreetView(panorama);
    moscow = {lat: 55.7538594, lng: 37.6206391}
    map = new google.maps.Map(document.getElementById("game_map"), {
        zoom: 12,
        center: moscow,
        mapTypeId: "roadmap",
        disableDefaultUI: true,
    });
    google.maps.event.addListener(map, "click", function (event) {  // Без этого кода нельзя ставить маркер на новой карте
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
    updateRound();
}

let updateRound = function () {
    var round = document.getElementById('round');
    var i = parseInt(round.textContent)
    round.textContent = i + 1;
};

let showDistance = function () {  // A - координаты точки панорамы, B - координаты точки, которую поставил игрок
    var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 3.5
    };
    markerA = new google.maps.Marker({
        position: latLngA,
        map: map,
        Clickable: false,
    });
    line = new google.maps.Polyline({
        path: [latLngA, latLngB],
        map: map,
        strokeOpacity: 0,
        icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
        }],

    }); // рисует линию между двумя маркерами
    distance = google.maps.geometry.spherical.computeDistanceBetween(markerA.getPosition(), markerB.getPosition()); // расстояние между маркерами в метрах
}

let updateScore = function () {
    TODO;
}

//setInterval(updateRound, 20)