function upDate() {
    jeu.temps.setMinutes(jeu.temps.getMinutes() + 1);
    if (jeu.temps.getMinutes() > 9)
        $('#soleil + p').text(jeu.temps.getHours() + ':' + jeu.temps.getMinutes());
    else
        $('#soleil + p').text(jeu.temps.getHours() + ':0' + jeu.temps.getMinutes());


    if ((jeu.temps.getHours() > 19 && jeu.temps.getHours() <= 23) ||(jeu.temps.getHours() >= 0 && jeu.temps.getHours() <= 6)){
        setNuit();
    } else {
        setJour();
    }

    setTimeout(upDate, 500);
}

function setNuit() {
    $('#soleil').attr('src', 'img/lune.png');
    $('#topBar').css('background-color', '#196b6b');
    $('#container').css('background-color', '#0b3638');
}

function setJour() {
    $('#soleil').attr('src', 'img/soleil.png');
    $('#topBar').css('background-color', '#c6eaea');
    $('#container').css('background-color', '#afd3d4');
}