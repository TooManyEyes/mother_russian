let locationsCoordinates = [
    ['Литейный мост', {lat: 59.9508667, lng: 30.3493337}],
    ['Дворцовый мост', {lat: 59.9410713, lng: 30.3082885}],
    ['Троицкий мост', {lat: 59.9468837, lng: 30.3291378}],
    ['Дворцовый мост', {lat: 59.9410713, lng: 30.3082885}],
    ['Благовещенский мост', {lat: 59.9346505, lng: 30.2895389}],
    ['Тучков мост', {lat: 59.9490079, lng: 30.2857113}],
    ['Мост Бетанкура', {lat: 59.9561468, lng: 30.2651087}],
    ['Биржевой мост', {lat: 59.9463115, lng: 30.3034866}],
    ['Большеохтинский мост', {lat: 59.9427087, lng: 30.4011907}],
    ['Мост Александра Невского', {lat: 59.9256516, lng: 30.3956367}],
    ['Володарский мост', {lat: 59.8776915, lng: 30.4535447}],
    ['Большой Обуховский (Вантовый) мост', {lat: 59.8537553, lng: 30.4916825}],
    ['Большой Петровский мост', {lat: 59.8537553, lng: 30.4916825}],
    ['Лазаревский мост', {lat: 59.9651244, lng: 30.2738374}],
    ['Каменоостровский мост', {lat: 59.9774967, lng: 30.3012994}],
    ['Ушаковский мост', {lat: 59.982548, lng: 30.3000831}],
    ['Мост Ломоносова', {lat: 59.9284032, lng: 30.3357683}],
    ['Итальянский мост', {lat: 59.9373, lng: 30.3270001}],
    ['Поцелуев мост', {lat: 59.9282183, lng: 30.2949978}],
    ['Львиный Мостик', {lat: 59.9271083, lng: 30.3015032}],
    ['Синий мост', {lat: 59.9315095, lng: 30.3082482}],
];


/*--------------------------------------------------------------Переменные-------------------------------------------------------------------------------*/
let hintCount = 0;
let roundCounter = 0;
let locationNumber = 0;
let buttonStatus = 1; // Отслеживает какую кнопку рядом с картой нужно показывать в данный момент см. функцию управления gameButton
let saintPetersburg = {lat:59.9132206, lng: 30.169971};
let markerB;
let markers = [];
let test = 0;

/*----------------------------------------------------------------Локации--------------------------------------------------------------------------------*/
let locations = [
    {
        name: 'Поцелуев мост',
        latLng: {lat: 59.9282183, lng: 30.2949978},
        description: 'Поцелуев мост — это одно из самых романтичных мест в Санкт-Петербурге, здесь часто назначаются свидания, а прекрасный вид на Исаакиевский собор привлекает художников.' +
            'Поцелуев мост увешан замочками, которые оставляют влюбленные, из-за их огромного числа рядом даже была установлена специальная конструкция',
    },
    {
        name: 'Ушаковский мост',
        latLng: {lat: 59.982548, lng: 30.3000831},
        description: 'Старое название моста – Строгановский. Это имя он получил в честь расположенной рядом дачи графа А.С. Строганова. После перестройки моста в 1954 году он был назван Ушаковским в память о великом русском флотоводце Ф. Ф. Ушакове.',
    },

    /*--Пример-- */
    /*
    {
        name: '',
        latLng: {},
        description: '',
        hints: ['']
    },
    */
]

/*--------------------------------------------------------------Игровой процесс--------------------------------------------------------------------------*/


function initGameProcess() {

    shuffle(locations)
    locations = locations.slice(0, 5)

    //Инициализация карты -------------------------------------------------


    //Инициализация кнопок ------------------------------------------------
    let gameButton = document.getElementById('gameButton');
    let hintButton = document.getElementById('hintButton');
    //---------------------------------------------------------------------

    //Добавляем обработку событий -----------------------------------------
    gameButton.addEventListener('click', function () {
        if (buttonStatus === 1) {
            buttonStatus -= 1;
            gameButton.innerText = 'продолжить';
            locationNumber += 1;
            // google.maps.event.clearListeners(map, 'click');
            // updateScore();
        }
        else { //Продолжить
            buttonStatus += 1;
            roundCounter += 1;
            gameButton.innerText = 'подтвердить';
            // updateRound();
            // updateMap();
            if (roundCounter > 5) {
                alert("Игра завершена");
                window.location = '../main_page/index.html';
            }
        }
    });


    hintButton.addEventListener('click', function () {

    });
    //---------------------------------------------------------------------
}
/*--------------------------------------------------------------Инициализация маркеров-------------------------------------------------------------------*/


/*-----------------------------------------------------------------Служебные функции---------------------------------------------------------------------*/


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getHint() {
  //Нарисовать на карте круг с радиусом 3000м
}

function initMap() {
    let map = new google.maps.Map(document.getElementById("game-map"), {
        zoom: 8,
        center: saintPetersburg,
        disableDefaultUI: true,
        clickableIcons: false,
        mapId: "757ff880503db59",
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

    panorama = new google.maps.StreetViewPanorama(document.getElementById("game-panorama"), {
            position: locations[0].latLng,
            pov: {heading: 34, pitch: 10},
            addressControl: false,
            enableCloseButton: false,
            disableDefaultUI: true,
        });


    for (let i = 0; i < locationsCoordinates.length; i++) {
        const bridge = locationsCoordinates[i];
        markers.push( new google.maps.Marker({
            position: bridge[1],
            title: bridge[0],
            map,
            icon: 'img/bridges.png',
            clickable: true,
        }));
    }

    google.maps.event.addListener(map, 'zoom_changed', function() {
        let zoom = map.getZoom();
        if (zoom < 12) {
            for (let i = 0; i < markers.length; i++) {
                markers[i].setVisible(false);
                markers[i].addListener("click", function (event) {
                    test +=1;
                });
                }
            }
         else {
            for (let i = 0; i < markers.length; i++) {
                markers[i].setVisible(true);
            }
        }
    })



    map.setStreetView(panorama);
}