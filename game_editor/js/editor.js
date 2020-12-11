let saintPetersburg = {lat: 59.9132206, lng: 30.169971};
let map;
let locationNumber = 1;
let panorama;
let locationName;
let userLocations = []

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: saintPetersburg,
        clickableIcons: false,
        mapId: "757ff880503db59",
    });
    panorama = new google.maps.StreetViewPanorama(document.getElementById("panorama"), {
        position: {lat: 59.9271083, lng: 30.3015032},
        pov: {heading: 180, pitch: 5},
        addressControl: false,
        enableCloseButton: false,
        disableDefaultUI: true,
        showRoadLabels: false,
    });
    map.setStreetView(panorama);
}

function addLocation() {
    if (locationName) {
        locations.insertAdjacentHTML('beforebegin',
            '<p class="mr-2 ">Ќазвание локации:\n' + locationName + '<br>' +
            'координаты ' + panorama.getPosition().toUrlValue());
        userLocations.push(
            {
                name: locationName,
                latLng: panorama.getPosition().toJSON(),
                description: '',
                hint: {},
                hintRadius: 0
            },
        );
        new google.maps.Marker({
            position: panorama.getPosition(),
            map,
        });
    } else {
        alert('¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации¬ведите название локации')
    }
}

function changeName() {
    locationName = document.getElementById("inputName").value;
}

function generateMap(){
    locations.insertAdjacentHTML('beforebegin',
        '<p class="mr-2 ">' +'"'+ JSON.stringify(userLocations) + '"'+'<br>')
}