
/*
    Début - Pour le dev du jeu
 */
   localStorage.setItem('sexe', 'garcon');
/*
    Fin - Pour le dev du jeu
 */

$( document ).ready(function() {
    // Set image étudiant
    $('#etudiant').attr('src', 'img/' + localStorage.getItem('sexe') + '.png');

    $($('.progress-bar')[0]).attr('aria-valuenow', 75).css('width', 75 + '%').append(75 + '%');
    $($('.progress-bar')[1]).attr('aria-valuenow', 100).css('width', 100 + '%').append(100 + '%');
    $($('.progress-bar')[2]).attr('aria-valuenow', 100).css('width', 100 + '%').append(100 + '%');
    $($('.progress-bar')[4]).attr('aria-valuenow', 1).css('width', 1 + '%').append(0);
});

