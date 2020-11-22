let markerA; // Маркер панорамы
let markerB; //Маркер игрока
let latLngA;
let latLngB;
let map;
let round = 1;
let locationNumber = 0 // Отслеживает какую локацию нужно вывести сейчас
let line;
let distance;
let score;
const confirmButton = document.querySelector('.confirmButton');
const continueButton = document.querySelector('.continueButton');
const fenway = { lat: 42.345573, lng: -71.098326 };
let moscow = {lat: 55.7538594, lng: 37.6206391};


function initGameProcess(gameInfo) {
    // let gameMode = gameInfo.get('gameMode');
    // let locations = gameInfo.get('locations');
    // let roundsCount = gameInfo.get('gameCount');
    // let scoreMultiplayer = gameInfo.get('scoreMultiplicator');
    // initGameMap(locations[locationNumber]);
    
    latLngA = {lat: 55.7538594, lng: 37.6206391} // locations[0]
    initGameMap(latLngA)
    
    //Инициализация кнопок -------------------------------------------
    let confirmButton = document.getElementById('confirmButton');
    let continueButton = document.getElementById('continueButton');
    
    confirmButton.addEventListener('click', function(){ // Подтвердить
                                   confirmButton.disabled = true;
                                   continueButton.disabled = false;
                                   updateScore();
                                   google.maps.event.clearListeners(map, 'click');
                                   });
                                   
    continueButton.addEventListener('click', function(){ // Продолжить
                                   confirmButton.disabled = false;
                                   continueButton.disabled = true;
                                   updateRound();
                                   updateMap();
                                   });
}

// game_mode - это словарь, который передает следующие сведения:
// 1 - название режима игры (gameMode),  2 - список локаций (locations),
// 3 - количество раундов (roundsCount), 4 - модификатор режима игры (scoreMultiplicator)


function initGameMap(latLngA) {
    map = new google.maps.Map(document.getElementById("game_map"), {
        zoom: 12,
        center: moscow,
        mapTypeId: "roadmap",
        disableDefaultUI: true,
        clickableIcons: false,
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


function updateMap() {
    locationNumber += 1

    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("game_panorama"), {
            position: fenway,
            pov: {heading: 34, pitch: 10,},
            addressControl: false,
            enableCloseButton: false,
        });

    map.setStreetView(panorama);
    map = new google.maps.Map(document.getElementById("game_map"), {
        zoom: 12,
        center: moscow,
        mapTypeId: "roadmap",
        disableDefaultUI: true,
        clickableIcons: false,
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
}

let updateRound = function () {
    round = document.getElementById('round');
    var i = parseInt(round.textContent)
    round.textContent = i + 1;
};

let showDistance = function () { 
    //TODO
}

let updateScore = function () {
    if (20000 - distance >= 0){
        score = document.getElementById('score');
        var j = parseInt(score.textContent);
        score.textContent = j + 1;
    }
}
