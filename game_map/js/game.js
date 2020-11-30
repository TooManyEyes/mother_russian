let panorama;
let markerA; // Маркер панорамы
let markerB; //Маркер игрока
let latLngA;
let latLngB;
let map;
let round = 1;
let roundCounter = 1;
let locationNumber = 0; // Отслеживает какую локацию нужно вывести сейчас
let line;
let distance;
let score;
let moscow = {lat: 55.7538594, lng: 37.6206391};
let roundsCount = 5; // Костыль до момента пока не сделаем выбор режима
let locations = new Map(Object.entries(JSON.parse(localStorage.getItem('locations'))))
let gameModeInfo = new Map(Object.entries(JSON.parse(localStorage.getItem('info'))))

function initGameProcess() {
    // let gameMode = gameInfo.get('gameMode');
    // let locations = gameInfo.get('locations');
    // let roundsCount = gameInfo.get('gameCount');
    // let scoreMultiplayer = gameInfo.get('scoreMultiplicator');
    // initGameMap(locations[locationNumber]);
    locations = Array.from(locations.values())
    shuffle(locations)
    latLngA = locations[0]
    initGameMap(latLngA)

    //Инициализация кнопок -------------------------------------------
    let confirmButton = document.getElementById('confirmButton');
    let continueButton = document.getElementById('continueButton');

    confirmButton.addEventListener('click', function () { // Подтвердить
        confirmButton.disabled = true;
        continueButton.disabled = false;
        updateScore();
        locationNumber += 1;
        google.maps.event.clearListeners(map, 'click');
    });

    continueButton.addEventListener('click', function () { // Продолжить
        latLngA = locations[locationNumber];
        confirmButton.disabled = false;
        continueButton.disabled = true;
        roundCounter += 1;
        if (roundCounter > roundsCount) {
            alert("Игра завершена");
            window.location='../main_page/index.html';
        }
        updateRound();
        updateMap();
    });
}

// game_mode - это словарь, который передает следующие сведения:
// 1 - название режима игры (gameMode),  2 - список локаций (locations),
// 3 - количество раундов (roundsCount), 4 - модификатор режима игры (scoreMultiplicator)


function initGameMap(latLngA) {
    map = new google.maps.Map(document.getElementById("game-map"), {
        zoom: 6,
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
        document.getElementById("game-panorama"), {
            position: latLngA,
            pov: {heading: 34, pitch: 10,},
            addressControl: false,
            enableCloseButton: false,
            disableDefaultUI: true,
            showRoadLabels: false
        });

    map.setStreetView(panorama);
}

function updateMap() {

    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("game-panorama"), {
            position: latLngA,
            pov: {heading: 34, pitch: 10,},
            addressControl: false,
            enableCloseButton: false,
            disableDefaultUI: true,
            showRoadLabels: false
        });

    map.setStreetView(panorama);
    map = new google.maps.Map(document.getElementById("game-map"), {
        zoom: 6,
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

function updateRound() {
    round = document.getElementById('round');
    var i = parseInt(round.textContent)
    round.textContent = i + 1;

}

function showDistance() {  // A - координаты точки панорамы, B - координаты точки, которую поставил игрок
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

function updateScore() {
    if (20000 - distance >= 0) {
        score = document.getElementById('score');
        var j = parseInt(score.textContent);
        score.textContent = j + 1;
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//setInterval(updateRound, 20)*/





