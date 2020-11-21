let locationsMap = new Map([
  ["Moscow", { lat: 55.7538594, lng: 37.6206391 }],
  ["Saint Petersburg", { lat: 59.9395103, lng: 30.3151588 }],
  ["Kazan", { lat: 55.7989683, lng: 49.1047278 }],
  ["Nizhny Novgorod", { lat: 56.326008, lng: 44.0045733 }],
  ["Samara", { lat:53.2037017, lng: 50.1111999 }],
  ["Ekaterinburg", { lat: 56.8387546, lng: 60.6044939 }],
  ["Irkutsk", { lat: 52.2800306, lng: 104.2816579 }],
  ["Sochi", { lat: 43.6716604, lng: 40.2966411}],
  ["Yaroslavl", { lat: 57.6190439, lng: 39.8714151}], 
  ["Vladivostok", { lat: 43.1132434, lng: 131.8907829}],
  ["Kaliningrad", { lat: 54.706665, lng: 20.5113333}],
  ["Arkhangelsk", { lat: 64.5439575, lng: 40.5107735}] 
]);

let locationsArr = [];
for (let location of locationsMap.keys()) {
  locationsArr.push(location); 
}
	
function shuffle(locationsArr) {

    for(
         let j, x, i = locationsArr.length; i; 
         j = parseInt(Math.random() * i), 
         x = locationsArr[--i], 
         locationsArr[i] = locationsArr[j], 
         locationsArr[j] = x
     );

    return locationsArr;
};

let randomLoc = shuffle(locationsArr);
alert(randomLoc);

//setInterval(updateRound, 20)
