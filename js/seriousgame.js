var jeu = new jeu();
var etudiant = new etudiant();
var tempoDoubleXp = 0;
var refreshIntervalIdRed = 0;
var refreshIntervalId = 0;
var refreshTimeoutId = 0;

$(document).ready(function () {
    // Set image étudiant
    $('#etudiant').attr('src', 'img/' + localStorage.getItem('sexe') + '.png');

    $('#topBar div:first-child p:first-child').text(localStorage.getItem('classe'));

    if (localStorage.getItem('classe') == 'Ingésup') {
        $('#specText').text('Capa. spéciale : Jouer');
    }
    else if (localStorage.getItem('classe') == 'Lim\'Art') {
        $('#specText').text('Capa. spéciale : Dessiner');
    }
    else {
        $('#specText').text('Capa. spéciale : Moneyer');
    }
    $($('.progress-bar')[0]).attr('aria-valuenow', 75).css('width', 75 + '%').append(75 + '%');
    $($('.progress-bar')[1]).attr('aria-valuenow', 100).css('width', 100 + '%').append(100 + '%');
    $($('.progress-bar')[2]).attr('aria-valuenow', 100).css('width', 100 + '%').append(100 + '%');
    $($('.progress-bar')[3]).attr('aria-valuenow', 25).css('width', 100 + '%').append(25 + '€');
    $($('.progress-bar')[4]).attr('aria-valuenow', 1).css('width', 1 + '%').append(0);

    //jeu.temps.setHours(19);
    //jeu.temps.setMinutes(50);
    upDate();
});

