
/*
    Début - Pour le dev du jeu
 */
localStorage.setItem('sexe', 'garcon');
localStorage.setItem('classe', 'Lim\'Art');
/*
    Fin - Pour le dev du jeu
 */

var jeu = new jeu();
var etudiant = new etudiant();

$( document ).ready(function() {
    // Set image étudiant
    $('#etudiant').attr('src', 'img/' + localStorage.getItem('sexe') + '.png');

    $('#topBar div:first-child p:first-child').text(localStorage.getItem('classe'));

    $($('.progress-bar')[0]).attr('aria-valuenow', 75).css('width', 75 + '%').append(75 + '%');
    $($('.progress-bar')[1]).attr('aria-valuenow', 100).css('width', 100 + '%').append(100 + '%');
    $($('.progress-bar')[2]).attr('aria-valuenow', 100).css('width', 100 + '%').append(100 + '%');
    $($('.progress-bar')[3]).attr('aria-valuenow', 25).css('width', 25 + '%').append(25 + '%');
    $($('.progress-bar')[4]).attr('aria-valuenow', 1).css('width', 1 + '%').append(0);

    //jeu.temps.setHours(19);
    //jeu.temps.setMinutes(50);
    upDate();
});

