const fs = require('fs')
const express = require('express')
const app= express()
var http = require('http').Server(app);


app.get('localhost:3001/?start_game',function (req,res){
    res.sendFile("client/game_map/game.html",{ root: '../' })
})

app.get('/',function (req,res){
    res.sendFile("client/start_page/index.html",{ root: '../' })
})
app.get('/Russia.png',function (req,res){
    res.sendFile("client/start_page/Russia.png",{ root: '../' })
})
app.get('/IMG_2363.JPEG',function (req,res){
    res.sendFile("client/start_page/IMG_2363.JPEG",{ root: '../' })
})

app.get('/style_menu.css',function (req,res){
    res.sendFile("client/start_page/style_menu.css",{ root: '../' })
})

app.get('/game.html',function (req,res){
    res.sendFile("client/game_map/game.html",{ root: '../' })
})
app.get('/map_script.js',function (req,res){
    res.sendFile("client/game_map/map_script.js",{ root: '../' })
})
app.get('/style.css',function (req,res){
    res.sendFile("client/game_map/style.css",{ root: '../' })
})

//app.use('/map_script.js', express.static("client/game_map/map_script.js",{ root: '../' }))

http.listen(3001, function(req){
    console.log('Server is listening on port 3001');
});

// http.createServer((request, response) => {
//     console.log('server work');
//     if (request.method === 'GET') {
//         // let urlRequest = url.parse(request.url, true);
//         // i=createLocations(urlRequest.query.quantity,urlRequest.query.map_tag)
//         // console.log(i)
//         response.sendFile(fs.readFileSync('../client/game_map/game.html'));
//     }
// }).listen(3001);


function createLocations(quantity, teg) {
    cities = JSON.parse(fs.readFileSync('panoramas.json').toString())[teg];
    arr = randomArray(quantity, cities.length);
    locations1 = new Array();
    for (let i = 0; i < arr.length; i++) {
        index = arr[i]
        locations1.push([cities[index].name, {lat: cities[index].lat, lng: cities[index].lng}]);
    }
    return locations1
}

function randomArray(quantity_need, length) {
    arr = new Array();
    for (let i = 0; i < quantity_need; i++) {
        city = Math.floor(Math.random() * (length));
        if (arr.indexOf(city) == -1) {
            arr.push(city)
        } else {
            i--
        }
    }
    return arr
}