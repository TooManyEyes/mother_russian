function scrollToMods(){
    var element = document.getElementById("game-mods");
    element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

function goToMap(){
    document.location.href = "../game_map/game.html";
}
