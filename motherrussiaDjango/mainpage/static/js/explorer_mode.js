/*--------------------------------------------------------------Переменные-------------------------------------------------------------------------------*/
let hintCount = 0;
let roundCounter = 0;
let locationNumber = 0;
let buttonStatus = 1; // Отслеживает какую кнопку рядом с картой нужно показывать в данный момент см. функцию управления gameButton
let moscow = {lat: 55.7230366, lng: 37.5972661};
let markers = [];
let test = 0;
let playerChoice;
let prevMarker = -1;
let map;
let listener;
let line;
let panorama;
let hintCircle;
let locations =[];
let distance;
let markerB;
let markerA;
let latLngA;
let latLngB;


function createLocations(){
for (let i = 0; i < 5; i++){
    TryRandomLocation(HandleCallback)
}
}

function TryRandomLocation(callback){
    let sv = new google.maps.StreetViewService();
    let latLng = new google.maps.LatLng(getRandomArbitrary(46, 60), getRandomArbitrary(28, 70));
    sv.getPanorama({
        location: latLng,
        preference: 'nearest',
        source: 'outdoor',
        radius: 100000}, callback)
}

function HandleCallback(data, status) {
    if (status == 'OK') {
    locations.push(data.location.latLng.toJSON());
    }
    else {
      TryRandomLocation(HandleCallback);
    }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


/*--------------------------------------------------------------Игровой процесс--------------------------------------------------------------------------*/
function initGameProcess() {
    localStorage.setItem('name', 'explorer_mode');
    //Перемешивание локаций и инициализация карты--------------------------
    createLocations();
    //---------------------------------------------------------------------


    //Инициализация кнопок ------------------------------------------------
    let gameButton = document.getElementById('gameButton');
    let hintButton = document.getElementById('hintButton');
    //---------------------------------------------------------------------

    //Добавляем обработку событий нажатия на кнопку -----------------------
    gameButton.addEventListener('click', function () {
        if (buttonStatus === 1) { //При нажатии на "Подтвердить"
            buttonStatus -= 1;
            locationNumber += 1;
            gameButton.innerText = 'продолжить';
            updateScore();
        } else { //При нажатии на "Продолжить"
            buttonStatus += 1;
            roundCounter += 1;
            gameButton.innerText = 'подтвердить';
            document.getElementById('gameButton').setAttribute("disabled", "true");
            if (roundCounter > 4) {
               document.location.href = "http://127.0.0.1:8000/game/endgame";
               locationsForEnding = locations;
               localStorage.setItem('locations', JSON.stringify(locationsForEnding));
            }
            updateRound();
            updateMap();
        }
    });
    setTimeout(function(){ initMap()},233);
}
/*----------------------------------------------------------------Инициализация карты--------------------------------------------------------------------*/
function initMap() {
    map = new google.maps.Map(document.getElementById("game-map"), {
        gestureHandling: "greedy",
        draggableCursor: 'crosshair',
        zoom: 3,
        center: moscow,
        disableDefaultUI: true,
        clickableIcons: false,
        mapId: "757ff880503db59",
    });

    google.maps.event.addListener(map, "click", function (event) {
        document.getElementById('gameButton').removeAttribute("disabled")
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
    panorama = new google.maps.StreetViewPanorama(document.getElementById("game-panorama"), {
        position: locations[0],
        pov: {heading: 34, pitch: 10},
        addressControl: false,
        enableCloseButton: false,
        disableDefaultUI: true,
        showRoadLabels: false,
    });
    map.setStreetView(panorama);
}
/*-----------------------------------------------------------------Обновление карты----------------------------------------------------------------------*/
function updateMap() {
    markerA.setMap(null);
    markerB.setMap(null);
    line.setMap(null);
    map.setCenter(moscow);
    map.setZoom(3)
    panorama.setPosition(locations[locationNumber])
}
/*-----------------------------------------------------------------Служебные функции---------------------------------------------------------------------*/
function showDistance() {  // A - координаты точки панорамы, B - координаты точки, которую поставил игрок

    let lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 2.5
    };
    markerA = new google.maps.Marker({
            position: locations[roundCounter],
            map: map,
            Clickable: false,
        });

    line = new google.maps.Polyline({
        path: [locations[roundCounter], markerB.getPosition()],
        map: map,
        strokeOpacity: 0,
        icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
        }],
    }); // рисует линию

    distance = google.maps.geometry.spherical.computeDistanceBetween(markerA.getPosition(), markerB.getPosition());
}

function updateRound() {
    round = document.getElementById('round');
    let i = parseInt(round.textContent)
    round.textContent = i + 1;
}

function updateScore() {
    let bounds = new google.maps.LatLngBounds();
    bounds.extend(locations[roundCounter]);
    bounds.extend(markerB.position);
    showDistance();
    map.fitBounds(bounds);
    score = document.getElementById('score');
    let j = parseInt(score.textContent);
    score.textContent = j + (Math.floor((100000*(1/distance)) * 100) / 100);
    }


