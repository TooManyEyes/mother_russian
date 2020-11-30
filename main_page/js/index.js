let gameModeTowns = new Map([
    ['roundCounter', 5],
    ['name', 'Города'],
    ['scoreMultiplayer', 1]
]);
let gameModeTownsLocations = new Map([
        ['Москва', { lat: 55.7538594, lng: 37.6206391 }],
        ['Санут-Петербург', { lat: 59.9395103, lng: 30.3151588 }],
        ['Казань', { lat: 55.7989683, lng: 49.1047278 }],
        ['Нижний Новгород', { lat: 56.326008, lng: 44.0045733 }],
        ['Самара', { lat:53.2037017, lng: 50.1111999 }],
        ['Екатеринбург', { lat: 56.8387546, lng: 60.6044939 }],
        ['Иркутск', { lat: 52.2800306, lng: 104.2816579 }],
        ['Сочи', { lat: 43.6716604, lng: 40.2966411 }],
        ['Ярославль', { lat: 57.6190439, lng: 39.8714151 }],
        ['Владивосток', { lat: 43.1132434, lng: 131.8907829 }],
        ['Калининград', { lat: 54.706665, lng: 20.5113333 }],
        ['Архангельск', { lat: 64.5439575, lng: 40.5107735 }],
        ['Пермь', { lat: 58.0097, lng: 56.2396 }],
        ['Новосибирск', { lat: 55.0306117, lng: 82.9205044 }],
        ['Краснодар', { lat: 45.0463314, lng: 38.9783778 }],
        ['Набережные Челны', {lat: 55.7420274, lng: 52.4154197 }],
        ['Саранск', { lat: 54.1824509, lng: 45.1815652 }],
        ['Челябинск', { lat: 55.1571582, lng: 61.4026938 }],
        ['Великий Устюг', { lat: 60.7609484, lng: 46.3001601 }],
        ['Норильск', { lat: 69.3411014, lng: 88.2096248 }],
        ['Петропавловск-Камчатский', { lat: 53.0238876, lng: 158.6388855 }]
        ]);


let gameModeBridges = new Map([
        ['roundCounter', 5],
        ['name', 'Мосты Петербурга'],
        ['scoreMultiplayer', 1]
    ])
let gameModeBridgesLocations = new Map([
    ['Литейный мост', { lat: 59.9508667, lng: 30.3493337 }],
    ['Дворцовый мост', { lat: 59.9410713, lng: 30.3082885 }],
    ['Троицкий мост', { lat: 59.9468837, lng: 30.3291378 }],
    ['Дворцовый мост', { lat: 59.9410713, lng: 30.3082885 }],
    ['Благовещенский мост', { lat: 59.9346505, lng: 30.2895389 }],
    ['Тучков мост', { lat: 59.9490079, lng: 30.2857113 }],
    ['Мост Бетанкура', { lat: 59.9561468, lng: 30.2651087 }],
    ['Биржевой мост', { lat: 59.9463115, lng: 30.3034866 }],
    ['Большеохтинский мост', { lat: 59.9427087, lng: 30.4011907 }],
    ['Мост Александра Невского', { lat: 59.9256516, lng: 30.3956367 }],
    ['Володарский мост', { lat: 59.8776915, lng: 30.4535447 }],
    ['Большой Обуховский (Вантовый) мост', { lat: 59.8537553, lng: 30.4916825 }],
    ['Большой Петровский мост', { lat: 59.8537553, lng: 30.4916825 }],
    ['Лазаревский мост', { lat: 59.9651244, lng: 30.2738374 }],
    ['Каменоостровский мост', { lat: 59.9774967, lng: 30.3012994 }],
    ['Ушаковский мост', { lat: 59.982548, lng: 30.3000831 }],
    ['Мост Ломоносова', { lat: 59.9284032, lng: 30.3357683 }],
    ['Итальянский мост', { lat: 59.9373, lng: 30.3270001 }],
    ['Поцелуев мост', { lat: 59.9282183, lng: 30.2949978 }],
    ['Львиный Мостик',{ lat: 59.9271083, lng: 30.3015032 }],
    ['Синий мост', { lat: 59.9315095, lng: 30.3082482 }],
    ]);

let gameModeRing = new Map([
    ['roundCounter', 5],
    ['name', 'Золотое кольцо'],
    ['scoreMultiplayer', 1]
]);

let gameModeRingLocations = new Map([
    ['Сергиев Посад', { lat: 56.310116, lng: 38.1298335 }],
    ['Переславль-Залесский', { lat: 56.7361264, lng: 38.8524575 }],
    ['Ростов', { lat: 57.1843974, lng: 39.4149331 }],
    ['Ярославль', { lat: 57.6228236, lng: 39.8924097 }],
    ['Кострома', { lat: 57.7772125, lng: 40.894648 }],
    ['Иваново', { lat: 57.0104007, lng: 40.9897791 }],
    ['Суздаль', { lat: 56.4274938, lng: 40.4404642 }],
    ['Владимир', { lat: 56.1266469, lng: 40.3970226 }],
]);


function scrollToMods(){
    var element = document.getElementById("game-mods");
    element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

function goToMap(){
    document.location.href = "../game_map/game.html";
}

function al(){
    alert("С вашей карточки 4329 **** **** **** списано 2999р")
}

function setGameMode(gameModeName){
    let locations;
    let info;
    if (gameModeName == 'Towns'){
        locations = JSON.stringify(Object.fromEntries(gameModeTownsLocations))
        info = JSON.stringify(Object.fromEntries(gameModeTowns))
        localStorage.setItem('locations', locations)
    }
    if (gameModeName == 'Bridges'){
        locations = JSON.stringify(Object.fromEntries(gameModeBridgesLocations))
        info = JSON.stringify(Object.fromEntries(gameModeBridges))
        localStorage.setItem('locations', locations)
        localStorage.setItem('info', info)
    }
    if (gameModeName == 'Ring'){
        locations = JSON.stringify(Object.fromEntries(gameModeRingLocations))
        info = JSON.stringify(Object.fromEntries(gameModeRing))
        localStorage.setItem('locations', locations)
        localStorage.setItem('info', info)
    }
}

