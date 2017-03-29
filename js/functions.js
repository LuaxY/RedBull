function upDate() {
    jeu.temps.setMinutes(jeu.temps.getMinutes() + 1);
    if (jeu.temps.getMinutes() > 9)
        $('#soleil + p').text(jeu.temps.getHours() + ':' + jeu.temps.getMinutes());
    else
        $('#soleil + p').text(jeu.temps.getHours() + ':0' + jeu.temps.getMinutes());


    if ((jeu.temps.getHours() > 19 && jeu.temps.getHours() <= 23) || (jeu.temps.getHours() >= 0 && jeu.temps.getHours() <= 6)) {
        setNuit();
    } else {
        setJour();
    }

    if (jeu.temps.getHours() >= 0 && jeu.temps.getHours() <= 6) {
        jeu.newDay = true;
    }

    if (jeu.newDay && jeu.temps.getHours() >= 7) {
        var valueEnergie = parseInt($($('.progress-bar')[1]).attr('aria-valuenow'));
        var valueMotiv = parseInt($($('.progress-bar')[2]).attr('aria-valuenow'));
        var valueSante = parseInt($($('.progress-bar')[0]).attr('aria-valuenow'));

        valueEnergie = parseInt(valueEnergie) - 25;
        valueMotiv = parseInt(valueMotiv) - 25;
        valueSante = parseInt(valueSante) - 25;

        $($('.progress-bar')[1]).attr('aria-valuenow', valueEnergie).css('width', valueEnergie + '%').html(valueEnergie + '%');
        $($('.progress-bar')[2]).attr('aria-valuenow', valueMotiv).css('width', valueMotiv + '%').html(valueMotiv + '%');
        $($('.progress-bar')[0]).attr('aria-valuenow', valueSante).css('width', valueSante + '%').html(valueSante + '%');
        localStorage.setItem("sante", valueSante);
        localStorage.setItem("energie", valueEnergie);
        localStorage.setItem("motiv", valueMotiv);
        jeu.newDay = false;
    }
    refreshTimeoutId = setTimeout(upDate, 500);
}

function setNuit() {
    $('#soleil').attr('src', 'img/lune.png');
    $('#topBar').css('background-color', '#196b6b');
    $('#container').css('background-color', '#0b3638');
    $('#container .list-group a:nth-child(6)').removeClass('disabled');
    jeu.barLocked = false;
    $('#container .list-group a:nth-child(6)').removeClass('disabled');
    jeu.barBoiteLockedNuit = false;
}

function setJour() {
    $('#soleil').attr('src', 'img/soleil.png');
    $('#topBar').css('background-color', '#c6eaea');
    $('#container').css('background-color', '#afd3d4');
    $('#container .list-group a:nth-child(6)').addClass('disabled');
    jeu.barLocked = true;
}

function resetEtudiant() {
    if (localStorage.getItem('sexe') == 'fille')
        $('#etudiant').attr('src', 'img/fille.png');
    else
        $('#etudiant').attr('src', 'img/garcon.png');
}

function upXp(val) {
    etudiant.xp = val;
    localStorage.setItem('xp', etudiant.xp);
    var affiche = "";
    if (etudiant.xp <= 100 && etudiant.lvl == "B1") {
        affiche = etudiant.xp + "/100";
    } else if (etudiant.xp >= 100 && etudiant.lvl == "B1") {
        affiche = etudiant.xp - 100 + "/300";
        etudiant.xp -= 100;
        jeu.divXpPourcent = 300;
        etudiant.lvl = "B2";
        $('#topBar div:first-child p:nth-child(2)').text(etudiant.lvl);
        localStorage.setItem('classe', etudiant.lvl);

        $('#container .list-group a:nth-child(9)').removeClass('disabled');
        jeu.salleLocked = false;
        jeu.nbRedBull = jeu.nbRedBull + 3;
    } else if ((etudiant.xp <= 300 && etudiant.lvl == "B2")) {
        affiche = etudiant.xp + "/300";
    } else if (etudiant.xp >= 300 && etudiant.lvl == "B2") {
        affiche = etudiant.xp - 300 + "/500";
        etudiant.xp -= 300;
        jeu.divXpPourcent = 500;
        etudiant.lvl = "B3";
        $('#topBar div:first-child p:nth-child(2)').text(etudiant.lvl);
        localStorage.setItem('classe', etudiant.lvl);
        $('#container .list-group a:nth-child(12)').removeClass('disabled');
        jeu.habitsLocked = false;
        $('#container .list-group a:nth-child(15)').removeClass('disabled');
        jeu.restaurantLocked = false;
        $('#container .list-group a:nth-child(5)').removeClass('disabled');
        jeu.travaillerLocked = false;
        jeu.nbRedBull = jeu.nbRedBull + 3;
    } else if ((etudiant.xp <= 500 && etudiant.lvl == "B3")) {
        affiche = etudiant.xp + "/500";
    } else if (etudiant.xp >= 500 && etudiant.lvl == "B3") {
        affiche = etudiant.xp - 500 + "/1000";
        etudiant.xp -= 500;
        jeu.divXpPourcent = 1000;
        etudiant.lvl = "M1";
        $('#topBar div:first-child p:nth-child(2)').text(etudiant.lvl);
        localStorage.setItem('classe', etudiant.lvl);
        $('#container .list-group a:nth-child(3)').removeClass('disabled');
        jeu.specLocked = false;
        jeu.nbRedBull = jeu.nbRedBull + 3;
    } else if ((etudiant.xp <= 1000 && etudiant.lvl == "M1")) {
        affiche = etudiant.xp + "/1000";
    } else if (etudiant.xp >= 1000 && etudiant.lvl == "M1") {
        affiche = etudiant.xp - 1000 + "/2000";
        etudiant.xp -= 1000;
        jeu.divXpPourcent = 2000;
        etudiant.lvl = "M2";
        $('#topBar div:first-child p:nth-child(2)').text(etudiant.lvl);
        localStorage.setItem('classe', etudiant.lvl);
        $('#container .list-group a:nth-child(7)').removeClass('disabled');
        jeu.barBoiteLocked = false;
        jeu.nbRedBull = jeu.nbRedBull + 3;
    } else if ((etudiant.xp <= 2000 && etudiant.lvl == "M2")) {
        affiche = etudiant.xp + "/2000";
    } else if (etudiant.xp >= 2000) {
        etudiant.lvl = "Diplômé";
        $("#modalInfoWin").modal("show");
    }
    return affiche;
}

/*
 Action
 */

function action(btn, isStop) {
    switch (btn.id) {
        case 'redbull':
            if (jeu.doubleXp == 1) {
                if (jeu.nbRedBull > 0) {
                    if (!jeu.actionEnCours)
                        if (localStorage.getItem('sexe') == 'fille')
                            $('#etudiant').attr('src', 'img/filleRedBull.png');
                        else
                            $('#etudiant').attr('src', 'img/garconRedBull.png');
                    $(btn).addClass('enCours');
                    $(btn.children[0].children[0]).text('Mmmmmh de la RedBull !');
                    $(btn.children[0].children[0]).css('color', 'brown');
                    jeu.doubleXp = 2;
                    jeu.nbRedBull -= 1;

                    refreshIntervalIdRed = setInterval(function () {
                        tempoDoubleXp++;
                        if (tempoDoubleXp >= 5) {
                            $(btn).removeClass('enCours');
                            if (!jeu.actionEnCours)
                                resetEtudiant();
                            tempoDoubleXp = 0;
                            jeu.doubleXp = 1;
                            clearInterval(refreshIntervalIdRed);
                            $(btn.children[0].children[0]).html("Boire une Red Bull (1h) (<p>"+jeu.nbRedBull+"</p>)");
                            $(btn.children[0].children[0]).css('color', '#668485');
                        }
                    }, 1000);
                } else {
                    $('#modalInfo .modal-body').html('Vous n\'avez plus de canettes...');
                    $('#modalInfo').modal('show');
                }
            }
            break;
        case 'reviser':
            if (!jeu.actionEnCours) {
                jeu.actionEnCours = true;
                if (localStorage.getItem('sexe') == 'fille')
                    $('#etudiant').attr('src', 'img/filleReviser.png');
                else
                    $('#etudiant').attr('src', 'img/garconReviser.png');
                $(btn).addClass('enCours');
                $(btn.children[0].children[0]).text('Arrêter de réviser');
                $(btn.children[0].children[0]).css('color', 'brown');
                $(btn).attr("onclick", "action(this, true)");

                var valueXP = parseInt($($('.progress-bar')[4]).attr('aria-valuenow'));
                var valueEnergie = parseInt($($('.progress-bar')[1]).attr('aria-valuenow'));
                var valueMotiv = parseInt($($('.progress-bar')[2]).attr('aria-valuenow'));

                if (valueXP == 1)
                    valueXP = 0;

                refreshIntervalId = setInterval(function () {

                    if (valueEnergie <= 0 || valueMotiv <= 0) {
                        if (valueEnergie <= 0) {
                            $($('.progress-bar')[1]).attr('aria-valuenow', 0).css('width', 0 + '%').html(0 + '%');
                            $('#modalInfo .modal-body').html("Vous n'avez plus d'energie \n");

                            $(btn).removeClass('enCours');
                            resetEtudiant();
                            jeu.actionEnCours = false;
                            $(btn.children[0].children[0]).text('Vendre des flyers');
                            $(btn.children[0].children[0]).css('color', '#668485');
                            $(btn).attr("onclick", "action(this, false)");
                            clearInterval(refreshIntervalId);
                            $('#modalInfo').modal('show');
                        }
                        if (valueMotiv <= 0) {
                            $('#modalInfoPerdu').modal('show');
                        }
                    } else {
                        jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                        var valueAffiche = upXp(parseInt(etudiant.xp) + (3 * jeu.doubleXp));
                        valueEnergie = parseInt(valueEnergie) - jeu.moinsEnergie;
                        valueMotiv = parseInt(valueMotiv) - jeu.moinsMotiv;
                        $($('.progress-bar')[4]).attr('aria-valuenow', (etudiant.xp / jeu.divXpPourcent) * 100).css('width', (etudiant.xp / jeu.divXpPourcent) * 100 + '%').text(valueAffiche);
                        $($('.progress-bar')[1]).attr('aria-valuenow', valueEnergie).css('width', valueEnergie + '%').html(valueEnergie + '%');
                        $($('.progress-bar')[2]).attr('aria-valuenow', valueMotiv).css('width', valueMotiv + '%').html(valueMotiv + '%');
                    }
                }, 2000);
            }
            if (isStop == true) {
                $(btn).removeClass('enCours');
                resetEtudiant();
                jeu.actionEnCours = false;
                $(btn.children[0].children[0]).text('Réviser');
                $(btn.children[0].children[0]).css('color', '#668485');
                $(btn).attr("onclick", "action(this, false)");
                clearInterval(refreshIntervalId);
            }
            break;
        case 'spec':
            if (!jeu.specLocked) {
                if (!jeu.actionEnCours) {
                    jeu.actionEnCours = true;
                    if (localStorage.getItem('classe') == 'Ingésup') {
                        if (localStorage.getItem('sexe') == 'fille')
                            $('#etudiant').attr('src', 'img/filleInge.png');
                        else
                            $('#etudiant').attr('src', 'img/garconInge.png');
                    }
                    else if (localStorage.getItem('classe') == 'Lim\'Art') {
                        if (localStorage.getItem('sexe') == 'fille')
                            $('#etudiant').attr('src', 'img/filleLimart.png');
                        else
                            $('#etudiant').attr('src', 'img/garconLimart.png');
                    }
                    else {
                        if (localStorage.getItem('sexe') == 'fille')
                            $('#etudiant').attr('src', 'img/filleIdi.png');
                        else
                            $('#etudiant').attr('src', 'img/garconIdi.png');
                    }

                    $(btn).addClass('enCours');
                    if (localStorage.getItem('classe') == 'Ingésup') {
                        $(btn.children[0].children[0]).text('Arrêter de Jouer');
                    }
                    else if (localStorage.getItem('classe') == 'Lim\'Art') {
                        $(btn.children[0].children[0]).text('Arrêter de Dessiner');
                    }
                    else {
                        $(btn.children[0].children[0]).text('Arrêter de Moneyer');
                    }
                    $(btn.children[0].children[0]).css('color', 'brown');
                    $(btn).attr("onclick", "action(this, true)");
                    var valueXP = parseInt($($('.progress-bar')[4]).attr('aria-valuenow'));
                    var valueEnergie = parseInt($($('.progress-bar')[1]).attr('aria-valuenow'));

                    if (valueXP == 1)
                        valueXP = 0;
                    refreshIntervalId = setInterval(function () {

                        if (valueEnergie <= 0 || valueMotiv <= 0) {
                            var message = "";
                            if (valueEnergie <= 0) {
                                $($('.progress-bar')[1]).attr('aria-valuenow', 0).css('width', 0 + '%').html(0 + '%');
                                message = "Vous n'avez plus d'energie \n";
                            }

                            $('#modalInfo .modal-body').html(message);

                            $(btn).removeClass('enCours');
                            resetEtudiant();
                            jeu.actionEnCours = false;
                            $(btn.children[0].children[0]).css('color', '#668485');
                            $(btn).attr("onclick", "action(this, false)");
                            clearInterval(refreshIntervalId);
                            $('#modalInfo').modal('show');
                        } else {
                            jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                            var valueAffiche = upXp(parseInt(etudiant.xp) + (6 * jeu.doubleXp));
                            valueEnergie = parseInt(valueEnergie) - jeu.moinsEnergie;
                            $($('.progress-bar')[4]).attr('aria-valuenow', (etudiant.xp / jeu.divXpPourcent) * 100).css('width', (etudiant.xp / jeu.divXpPourcent) * 100 + '%').text(valueAffiche);
                            $($('.progress-bar')[1]).attr('aria-valuenow', valueEnergie).css('width', valueEnergie + '%').html(valueEnergie + '%');
                        }
                    }, 2000);
                }
                if (isStop == true) {
                    $(btn).removeClass('enCours');
                    resetEtudiant();
                    jeu.actionEnCours = false;
                    if (localStorage.getItem('classe') == 'Ingésup') {
                        $(btn.children[0].children[0]).text('Capa.  spéciale: Jouer');
                    }
                    else if (localStorage.getItem('classe') == 'Lim\'Art') {
                        $(btn.children[0].children[0]).text('Capa.  spéciale: Dessiner');
                    }
                    else {
                        $(btn.children[0].children[0]).text('Capa.  spéciale: Money');
                    }
                    $(btn.children[0].children[0]).css('color', '#668485');
                    $(btn).attr("onclick", "action(this, false)");
                    clearInterval(refreshIntervalId);
                }
            }
            break;
        case 'flyers':

            if (!jeu.actionEnCours) {
                jeu.actionEnCours = true;
                if (localStorage.getItem('sexe') == 'fille')
                    $('#etudiant').attr('src', 'img/filleFlyers.png');
                else
                    $('#etudiant').attr('src', 'img/garconFlyers.png');
                $(btn).addClass('enCours');
                $(btn.children[0].children[0]).text('Arrêter de vendre');
                $(btn.children[0].children[0]).css('color', 'brown');
                $(btn).attr("onclick", "action(this, true)");

                var valueArgent = parseInt($($('.progress-bar')[3]).attr('aria-valuenow'));
                var valueEnergie = parseInt($($('.progress-bar')[1]).attr('aria-valuenow'));

                refreshIntervalId = setInterval(function () {
                    if (valueEnergie <= 0) {
                        var message = "";
                        if (valueEnergie <= 0) {
                            $($('.progress-bar')[1]).attr('aria-valuenow', 0).css('width', 0 + '%').html(0 + '%');
                            message = "Vous n'avez plus d'energie \n";
                        }
                        $('#modalInfo .modal-body').html(message);

                        $(btn).removeClass('enCours');
                        resetEtudiant();
                        jeu.actionEnCours = false;
                        $(btn.children[0].children[0]).text('Vendre des flyers');
                        $(btn.children[0].children[0]).css('color', '#668485');
                        $(btn).attr("onclick", "action(this, false)");
                        clearInterval(refreshIntervalId);
                        $('#modalInfo').modal('show');
                    } else {
                        jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                        valueArgent = parseInt(valueArgent) + 10;
                        valueEnergie = parseInt(valueEnergie) - jeu.moinsMoinsEnergie;
                        $($('.progress-bar')[3]).attr('aria-valuenow', valueArgent).html(valueArgent + '€');
                        $($('.progress-bar')[1]).attr('aria-valuenow', valueEnergie).css('width', valueEnergie + '%').html(valueEnergie + '%');
                    }

                }, 2000);
            }
            if (isStop == true) {
                $(btn).removeClass('enCours');
                resetEtudiant();
                jeu.actionEnCours = false;
                $(btn.children[0].children[0]).text('Vendre des flyers');
                $(btn.children[0].children[0]).css('color', '#668485');
                $(btn).attr("onclick", "action(this, false)");
                clearInterval(refreshIntervalId);
            }
            break;
        case 'travailler':
            if (!jeu.travaillerLocked) {

                if (!jeu.actionEnCours) {
                    jeu.actionEnCours = true;
                    if (localStorage.getItem('sexe') == 'fille')
                        $('#etudiant').attr('src', 'img/filleTravailler.png');
                    else
                        $('#etudiant').attr('src', 'img/garconTravailler.png');
                    $(btn).addClass('enCours');
                    $(btn.children[0].children[0]).text('Arrêter de travailler');
                    $(btn.children[0].children[0]).css('color', 'brown');
                    $(btn).attr("onclick", "action(this, true)");

                    var valueArgent = parseInt($($('.progress-bar')[3]).attr('aria-valuenow'));
                    var valueEnergie = parseInt($($('.progress-bar')[1]).attr('aria-valuenow'));

                    refreshIntervalId = setInterval(function () {
                        if (valueEnergie <= 0) {
                            var message = "";
                            if (valueEnergie <= 0) {
                                $($('.progress-bar')[1]).attr('aria-valuenow', 0).css('width', 0 + '%').html(0 + '%');
                                message = "Vous n'avez plus d'energie \n";
                            }
                            $('#modalInfo .modal-body').html(message);

                            $(btn).removeClass('enCours');
                            resetEtudiant();
                            jeu.actionEnCours = false;
                            $(btn.children[0].children[0]).text('Vendre des flyers');
                            $(btn.children[0].children[0]).css('color', '#668485');
                            $(btn).attr("onclick", "action(this, false)");
                            clearInterval(refreshIntervalId);
                            $('#modalInfo').modal('show');
                        } else {
                            jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                            valueArgent = parseInt(valueArgent) + 50;
                            valueEnergie = parseInt(valueEnergie) - jeu.moinsMoinsMoinsEnergie;
                            $($('.progress-bar')[3]).attr('aria-valuenow', valueArgent).html(valueArgent + '€');
                            $($('.progress-bar')[1]).attr('aria-valuenow', valueEnergie).css('width', valueEnergie + '%').html(valueEnergie + '%');
                        }

                    }, 2000);
                }
                if (isStop == true) {
                    $(btn).removeClass('enCours');
                    resetEtudiant();
                    jeu.actionEnCours = false;
                    $(btn.children[0].children[0]).text('Travailler');
                    $(btn.children[0].children[0]).css('color', '#668485');
                    $(btn).attr("onclick", "action(this, false)");
                    clearInterval(refreshIntervalId);
                }
            }
            break;
        case 'bar':
            if (!jeu.barLocked) {
                if (!jeu.actionEnCours) {
                    jeu.actionEnCours = true;
                    if (localStorage.getItem('sexe') == 'fille')
                        $('#etudiant').attr('src', 'img/filleBar.png');
                    else
                        $('#etudiant').attr('src', 'img/garconBar.png');
                    $(btn).addClass('enCours');
                    $(btn.children[0].children[0]).text('Rentrer à la maison');
                    $(btn.children[0].children[0]).css('color', 'brown');
                    $(btn).attr("onclick", "action(this, true)");

                    var valueEnergie = parseInt($($('.progress-bar')[1]).attr('aria-valuenow'));
                    var valueMotiv = parseInt($($('.progress-bar')[2]).attr('aria-valuenow'));
                    var valueSante = parseInt($($('.progress-bar')[0]).attr('aria-valuenow'));

                    refreshIntervalId = setInterval(function () {
                        if (valueEnergie <= 0 || valueSante <= 0) {
                            var message = "";
                            if (valueEnergie <= 0) {
                                $($('.progress-bar')[1]).attr('aria-valuenow', 0).css('width', 0 + '%').html(0 + '%');
                                message = "Vous n'avez plus d'energie \n";

                                $('#modalInfo .modal-body').html(message);
                                $(btn).removeClass('enCours');
                                resetEtudiant();
                                jeu.actionEnCours = false;
                                $(btn.children[0].children[0]).text('Aller au bar');
                                $(btn.children[0].children[0]).css('color', '#668485');
                                $(btn).attr("onclick", "action(this, false)");
                                $('#modalInfo').modal('show');
                            }

                            if (valueSante <= 0) {
                                $('#modalInfoPerdu').modal('show');
                            }
                            clearInterval(refreshIntervalId);
                        } else {
                            jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                            valueEnergie = parseInt(valueEnergie) - jeu.moinsEnergie;
                            valueMotiv = parseInt(valueMotiv) + jeu.plusMotiv;
                            valueSante = parseInt(valueSante) - jeu.moinsSante;
                            if (parseInt(valueMotiv) > 100)
                                valueMotiv = 100;
                            $($('.progress-bar')[1]).attr('aria-valuenow', valueEnergie).css('width', valueEnergie + '%').html(valueEnergie + '%');
                            $($('.progress-bar')[2]).attr('aria-valuenow', valueMotiv).css('width', valueMotiv + '%').html(valueMotiv + '%');
                            $($('.progress-bar')[0]).attr('aria-valuenow', valueSante).css('width', valueSante + '%').html(valueSante + '%');
                        }

                    }, 2000);
                }
                if (isStop == true) {
                    $(btn).removeClass('enCours');
                    resetEtudiant();
                    jeu.actionEnCours = false;
                    $(btn.children[0].children[0]).text('Aller au Bar');
                    $(btn.children[0].children[0]).css('color', '#668485');
                    $(btn).attr("onclick", "action(this, false)");
                    clearInterval(refreshIntervalId);
                }
            } else {
                $('#modalInfo .modal-body').text("Vous ne pouvez pas aller au bar !");
                $('#modalInfo').modal('show');
            }
            break;
        case 'barBoite':
            if (!jeu.barBoiteLocked && !jeu.barBoiteLockedNuit) {
                if (!jeu.actionEnCours) {
                    jeu.actionEnCours = true;
                    if (localStorage.getItem('sexe') == 'fille')
                        $('#etudiant').attr('src', 'img/filleBarBoite.png');
                    else
                        $('#etudiant').attr('src', 'img/garconBarBoite.png');
                    $(btn).addClass('enCours');
                    $(btn.children[0].children[0]).text('Rentrer à la maison');
                    $(btn.children[0].children[0]).css('color', 'brown');
                    $(btn).attr("onclick", "action(this, true)");

                    var valueEnergie = parseInt($($('.progress-bar')[1]).attr('aria-valuenow'));
                    var valueMotiv = parseInt($($('.progress-bar')[2]).attr('aria-valuenow'));
                    var valueSante = parseInt($($('.progress-bar')[0]).attr('aria-valuenow'));

                    refreshIntervalId = setInterval(function () {
                        if (valueEnergie <= 0 || valueSante <= 0) {
                            var message = "";
                            if (valueEnergie <= 0) {
                                $($('.progress-bar')[1]).attr('aria-valuenow', 0).css('width', 0 + '%').html(0 + '%');
                                message = "Vous n'avez plus d'energie \n";
                                $('#modalInfo .modal-body').html(message);
                                $(btn).removeClass('enCours');
                                resetEtudiant();
                                jeu.actionEnCours = false;
                                $(btn.children[0].children[0]).text('Aller Bar + boîte');
                                $(btn.children[0].children[0]).css('color', '#668485');
                                $(btn).attr("onclick", "action(this, false)");
                                clearInterval(refreshIntervalId);
                                $('#modalInfo').modal('show');
                            }

                            if (valueSante <= 0) {
                                $('#modalInfoPerdu').modal('show');
                            }

                        } else {
                            jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                            valueEnergie = parseInt(valueEnergie) - jeu.moinsMoinsEnergie;
                            valueMotiv = parseInt(valueMotiv) + jeu.plusPlusMotiv;
                            valueSante = parseInt(valueSante) - jeu.moinsSante;
                            if (parseInt(valueMotiv) > 100)
                                valueMotiv = 100;
                            $($('.progress-bar')[1]).attr('aria-valuenow', valueEnergie).css('width', valueEnergie + '%').html(valueEnergie + '%');
                            $($('.progress-bar')[2]).attr('aria-valuenow', valueMotiv).css('width', valueMotiv + '%').html(valueMotiv + '%');
                            $($('.progress-bar')[0]).attr('aria-valuenow', valueSante).css('width', valueSante + '%').html(valueSante + '%');
                        }

                    }, 2000);
                }
                if (isStop == true) {
                    $(btn).removeClass('enCours');
                    resetEtudiant();
                    jeu.actionEnCours = false;
                    $(btn.children[0].children[0]).text('Aller Bar + boîte');
                    $(btn.children[0].children[0]).css('color', '#668485');
                    $(btn).attr("onclick", "action(this, false)");
                    clearInterval(refreshIntervalId);
                }
            } else {
                $('#modalInfo .modal-body').text("Vous ne pouvez pas aller au bar et en boîte !");
                $('#modalInfo').modal('show');
            }
            break;
        case 'courir':
            if (!jeu.actionEnCours) {
                jeu.actionEnCours = true;
                if (localStorage.getItem('sexe') == 'fille')
                    $('#etudiant').attr('src', 'img/filleCourir.png');
                else
                    $('#etudiant').attr('src', 'img/garconCourir.png');
                $(btn).addClass('enCours');
                $(btn.children[0].children[0]).text('Rentrer à la maison');
                $(btn.children[0].children[0]).css('color', 'brown');
                $(btn).attr("onclick", "action(this, true)");

                var valueEnergie = parseInt($($('.progress-bar')[1]).attr('aria-valuenow'));
                var valueSante = parseInt($($('.progress-bar')[0]).attr('aria-valuenow'));

                refreshIntervalId = setInterval(function () {
                    if (valueEnergie <= 0 || valueSante <= 0) {
                        var message = "";
                        if (valueEnergie <= 0) {
                            $($('.progress-bar')[1]).attr('aria-valuenow', 0).css('width', 0 + '%').html(0 + '%');
                            message = "Vous n'avez plus d'energie \n";
                        }

                        $('#modalInfo .modal-body').html(message);
                        $(btn).removeClass('enCours');
                        resetEtudiant();
                        jeu.actionEnCours = false;
                        $(btn.children[0].children[0]).text('Aller courir');
                        $(btn.children[0].children[0]).css('color', '#668485');
                        $(btn).attr("onclick", "action(this, false)");
                        clearInterval(refreshIntervalId);
                        $('#modalInfo').modal('show');
                    } else {
                        jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                        valueEnergie = parseInt(valueEnergie) - jeu.moinsEnergie;
                        valueSante = parseInt(valueSante) + jeu.plusSante;
                        if (parseInt(valueSante) > 100)
                            valueSante = 100;
                        $($('.progress-bar')[1]).attr('aria-valuenow', valueEnergie).css('width', valueEnergie + '%').html(valueEnergie + '%');
                        $($('.progress-bar')[0]).attr('aria-valuenow', valueSante).css('width', valueSante + '%').html(valueSante + '%');
                    }

                }, 2000);
            }
            if (isStop == true) {
                $(btn).removeClass('enCours');
                resetEtudiant();
                jeu.actionEnCours = false;
                $(btn.children[0].children[0]).text('Aller courir');
                $(btn.children[0].children[0]).css('color', '#668485');
                $(btn).attr("onclick", "action(this, false)");
                clearInterval(refreshIntervalId);
            }
            break;
        case 'salle':
            if (!jeu.salleLocked) {
                if (!jeu.actionEnCours) {
                    jeu.actionEnCours = true;
                    if (localStorage.getItem('sexe') == 'fille')
                        $('#etudiant').attr('src', 'img/filleSalle.png');
                    else
                        $('#etudiant').attr('src', 'img/garconSalle.png');
                    $(btn).addClass('enCours');
                    $(btn.children[0].children[0]).text('Rentrer à la maison');
                    $(btn.children[0].children[0]).css('color', 'brown');
                    $(btn).attr("onclick", "action(this, true)");

                    var valueEnergie = parseInt($($('.progress-bar')[1]).attr('aria-valuenow'));
                    var valueSante = parseInt($($('.progress-bar')[0]).attr('aria-valuenow'));

                    refreshIntervalId = setInterval(function () {
                        if (valueEnergie <= 0 || valueSante <= 0) {
                            var message = "";
                            if (valueEnergie <= 0) {
                                $($('.progress-bar')[1]).attr('aria-valuenow', 0).css('width', 0 + '%').html(0 + '%');
                                message = "Vous n'avez plus d'energie \n";
                            }

                            $('#modalInfo .modal-body').html(message);
                            $(btn).removeClass('enCours');
                            resetEtudiant();
                            jeu.actionEnCours = false;
                            $(btn.children[0].children[0]).text('Aller à la salle de sport');
                            $(btn.children[0].children[0]).css('color', '#668485');
                            $(btn).attr("onclick", "action(this, false)");
                            clearInterval(refreshIntervalId);
                            $('#modalInfo').modal('show');
                        } else {
                            jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                            valueEnergie = parseInt(valueEnergie) - jeu.moinsMoinsEnergie;
                            valueSante = parseInt(valueSante) + jeu.plusPlusSante;
                            if (parseInt(valueSante) > 100)
                                valueSante = 100;
                            $($('.progress-bar')[1]).attr('aria-valuenow', valueEnergie).css('width', valueEnergie + '%').html(valueEnergie + '%');
                            $($('.progress-bar')[0]).attr('aria-valuenow', valueSante).css('width', valueSante + '%').html(valueSante + '%');
                        }

                    }, 2000);
                }
                if (isStop == true) {
                    $(btn).removeClass('enCours');
                    resetEtudiant();
                    jeu.actionEnCours = false;
                    $(btn.children[0].children[0]).text('Aller à la salle de sport');
                    $(btn.children[0].children[0]).css('color', '#668485');
                    $(btn).attr("onclick", "action(this, false)");
                    clearInterval(refreshIntervalId);
                }
            }
            break;
        case 'toilettes':
            if (!jeu.actionEnCours) {
                jeu.actionEnCours = true;
                if (localStorage.getItem('sexe') == 'fille')
                    $('#etudiant').attr('src', 'img/filleToilette.png');
                else
                    $('#etudiant').attr('src', 'img/garconToilette.png');
                $(btn).addClass('enCours');
                $(btn.children[0].children[0]).text('Tirer la chasse');
                $(btn.children[0].children[0]).css('color', 'brown');
                $(btn).attr("onclick", "action(this, true)");

                var valueMotiv = parseInt($($('.progress-bar')[2]).attr('aria-valuenow'));
                var valueSante = parseInt($($('.progress-bar')[0]).attr('aria-valuenow'));

                refreshIntervalId = setInterval(function () {
                    if (valueMotiv <= 0) {
                        clearInterval(refreshIntervalId);
                        $('#modalInfoPerdu').modal('show');
                    } else {
                        jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                        valueMotiv = parseInt(valueMotiv) - jeu.moinsMotiv;
                        valueSante = parseInt(valueSante) + jeu.plusSante;
                        if (parseInt(valueSante) > 100)
                            valueSante = 100;
                        $($('.progress-bar')[2]).attr('aria-valuenow', valueMotiv).css('width', valueMotiv + '%').html(valueMotiv + '%');
                        $($('.progress-bar')[0]).attr('aria-valuenow', valueSante).css('width', valueSante + '%').html(valueSante + '%');
                    }

                }, 2000);
            }
            if (isStop == true) {
                $(btn).removeClass('enCours');
                resetEtudiant();
                jeu.actionEnCours = false;
                $(btn.children[0].children[0]).text('Aller aus toilettes');
                $(btn.children[0].children[0]).css('color', '#668485');
                $(btn).attr("onclick", "action(this, false)");
                clearInterval(refreshIntervalId);
            }
            break;
        case 'rencontrer':
            if (!jeu.actionEnCours) {
                jeu.actionEnCours = true;
                if (localStorage.getItem('sexe') == 'fille')
                    $('#etudiant').attr('src', 'img/filleRencontrer.png');
                else
                    $('#etudiant').attr('src', 'img/garconRencontrer.png');
                $(btn).addClass('enCours');
                $(btn.children[0].children[0]).text('Rentrer à la maison');
                $(btn.children[0].children[0]).css('color', 'brown');
                $(btn).attr("onclick", "action(this, true)");

                var valueXP = parseInt($($('.progress-bar')[4]).attr('aria-valuenow'));
                var valueEnergie = parseInt($($('.progress-bar')[1]).attr('aria-valuenow'));
                var valueMotiv = parseInt($($('.progress-bar')[2]).attr('aria-valuenow'));

                if (valueXP == 1)
                    valueXP = 0;

                refreshIntervalId = setInterval(function () {
                    if (valueMotiv <= 0 || valueEnergie <= 0) {
                        var message = "";
                        if (valueEnergie <= 0) {
                            $($('.progress-bar')[1]).attr('aria-valuenow', 0).css('width', 0 + '%').html(0 + '%');
                            message = "Vous n'avez plus d'energie \n";
                        }

                        $('#modalInfo .modal-body').html(message);
                        $(btn).removeClass('enCours');
                        resetEtudiant();
                        jeu.actionEnCours = false;
                        $(btn.children[0].children[0]).text('Rencontrer des gens');
                        $(btn.children[0].children[0]).css('color', '#668485');
                        $(btn).attr("onclick", "action(this, false)");
                        clearInterval(refreshIntervalId);
                        $('#modalInfo').modal('show');
                    } else {
                        jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                        valueEnergie = parseInt(valueEnergie) - jeu.moinsMoinsEnergie;
                        valueMotiv = parseInt(valueMotiv) + jeu.plusMotiv;
                        if (parseInt(valueMotiv) > 100)
                            valueMotiv = 100;
                        var valueAffiche = upXp(parseInt(etudiant.xp) + (3 * jeu.doubleXp));
                        $($('.progress-bar')[4]).attr('aria-valuenow', (etudiant.xp / jeu.divXpPourcent) * 100).css('width', (etudiant.xp / jeu.divXpPourcent) * 100 + '%').text(valueAffiche);
                        $($('.progress-bar')[1]).attr('aria-valuenow', valueEnergie).css('width', valueEnergie + '%').html(valueEnergie + '%');
                        $($('.progress-bar')[2]).attr('aria-valuenow', valueMotiv).css('width', valueMotiv + '%').html(valueMotiv + '%');
                    }

                }, 2000);
            } else if (isStop == true) {
                $(btn).removeClass('enCours');
                resetEtudiant();
                jeu.actionEnCours = false;
                $(btn.children[0].children[0]).text('Rencontrer des gens');
                $(btn.children[0].children[0]).css('color', '#668485');
                $(btn).attr("onclick", "action(this, false)");
                clearInterval(refreshIntervalId);
            }
            break;
        case 'habits':
            if (!jeu.habitsLocked) {
                if (!jeu.actionEnCours) {
                    var valueArgent = parseInt($($('.progress-bar')[3]).attr('aria-valuenow'));
                    if (parseInt(valueArgent) >= 50) {
                        jeu.actionEnCours = true;
                        if (localStorage.getItem('sexe') == 'fille')
                            $('#etudiant').attr('src', 'img/filleShopping.png');
                        else
                            $('#etudiant').attr('src', 'img/garconPendrie.png');
                        $(btn).addClass('enCours');
                        $(btn.children[0].children[0]).text('Rentrer à la maison');
                        $(btn.children[0].children[0]).css('color', 'brown');
                        $(btn).attr("onclick", "action(this, true)");

                        var valueMotiv = parseInt($($('.progress-bar')[2]).attr('aria-valuenow'));

                        refreshIntervalId = setInterval(function () {
                            if (parseInt(valueArgent) < 50) {
                                $('#modalInfo .modal-body').html('Vous n\'avez plus assez de sous');
                                $(btn).removeClass('enCours');
                                resetEtudiant();
                                jeu.actionEnCours = false;
                                $(btn.children[0].children[0]).text('Shopping');
                                $(btn.children[0].children[0]).css('color', '#668485');
                                $(btn).attr("onclick", "action(this, false)");
                                clearInterval(refreshIntervalId);
                                $('#modalInfo').modal('show');
                            } else {
                                jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                                valueMotiv = parseInt(valueMotiv) + jeu.plusPlusMotiv;
                                valueArgent = parseInt(valueArgent) - 50;
                                if (parseInt(valueMotiv) > 100)
                                    valueMotiv = 100;
                                $($('.progress-bar')[3]).attr('aria-valuenow', valueArgent).html(valueArgent + '€');
                                $($('.progress-bar')[2]).attr('aria-valuenow', valueMotiv).css('width', valueMotiv + '%').html(valueMotiv + '%');
                            }
                        }, 2000);
                    } else {
                        $('#modalInfo .modal-body').html('Vous n\'avez pas assez de sous');
                        $('#modalInfo').modal('show');
                    }
                } else if (isStop == true) {
                    $(btn).removeClass('enCours');
                    resetEtudiant();
                    jeu.actionEnCours = false;
                    $(btn.children[0].children[0]).text('Shopping');
                    $(btn.children[0].children[0]).css('color', '#668485');
                    $(btn).attr("onclick", "action(this, false)");
                    clearInterval(refreshIntervalId);
                }
            }
            break;
        case 'courses':
            var valueArgent = parseInt($($('.progress-bar')[3]).attr('aria-valuenow'));
            if (parseInt(valueArgent) >= 5) {
                if (!jeu.actionEnCours) {
                    if (localStorage.getItem('sexe') == 'fille')
                        $('#etudiant').attr('src', 'img/filleCourses.png');
                    else
                        $('#etudiant').attr('src', 'img/garconCourses.png');

                    var valueSante = parseInt($($('.progress-bar')[0]).attr('aria-valuenow'));

                    jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                    valueSante = parseInt(valueSante) + jeu.plusSante;
                    valueArgent = parseInt(valueArgent) - 5;
                    if (parseInt(valueSante) > 100)
                        valueSante = 100;
                    $($('.progress-bar')[3]).attr('aria-valuenow', valueArgent).html(valueArgent + '€');
                    $($('.progress-bar')[0]).attr('aria-valuenow', valueSante).css('width', valueSante + '%').html(valueSante + '%');
                }
            } else {
                $('#modalInfo .modal-body').html('Vous n\'avez pas assez de sous');
                $('#modalInfo').modal('show');
            }
            break;
        case 'fastfood':
            var valueArgent = parseInt($($('.progress-bar')[3]).attr('aria-valuenow'));
            if (parseInt(valueArgent) >= 10) {
                if (!jeu.actionEnCours) {
                    if (localStorage.getItem('sexe') == 'fille')
                        $('#etudiant').attr('src', 'img/filleCourses.png');
                    else
                        $('#etudiant').attr('src', 'img/garconCourses.png');

                    var valueSante = parseInt($($('.progress-bar')[0]).attr('aria-valuenow'));
                    var valueEnergie = parseInt($($('.progress-bar')[1]).attr('aria-valuenow'));

                    jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                    valueSante = parseInt(valueSante) - jeu.moinsSante;
                    valueEnergie = parseInt(valueEnergie) + jeu.plusEnergie;
                    valueArgent = parseInt(valueArgent) - 10;
                    if (parseInt(valueEnergie) > 100)
                        valueEnergie = 100;
                    $($('.progress-bar')[3]).attr('aria-valuenow', valueArgent).html(valueArgent + '€');
                    $($('.progress-bar')[0]).attr('aria-valuenow', valueSante).css('width', valueSante + '%').html(valueSante + '%');
                    $($('.progress-bar')[1]).attr('aria-valuenow', valueEnergie).css('width', valueEnergie + '%').html(valueEnergie + '%');
                    if (valueSante <= 0)
                        $("#modalInfoPerdu").modal('show');
                }
            } else {
                $('#modalInfo .modal-body').html('Vous n\'avez pas assez de sous');
                $('#modalInfo').modal('show');
            }
            break;
        case 'restaurant':
            if (!jeu.restaurantLocked) {
                var valueArgent = parseInt($($('.progress-bar')[3]).attr('aria-valuenow'));
                if (parseInt(valueArgent) >= 50) {
                    if (!jeu.actionEnCours) {
                        if (localStorage.getItem('sexe') == 'fille')
                            $('#etudiant').attr('src', 'img/filleManger.png');
                        else
                            $('#etudiant').attr('src', 'img/garconManger.png');

                        var valueSante = parseInt($($('.progress-bar')[0]).attr('aria-valuenow'));
                        var valueEnergie = parseInt($($('.progress-bar')[1]).attr('aria-valuenow'));

                        jeu.temps.setMinutes(jeu.temps.getMinutes() + 30);
                        valueSante = parseInt(valueSante) + jeu.plusPlusSante;
                        valueEnergie = parseInt(valueEnergie) + jeu.plusEnergie;
                        valueArgent = parseInt(valueArgent) - 50;
                        if (parseInt(valueEnergie) > 100)
                            valueEnergie = 100;
                        if (parseInt(valueSante) > 100)
                            valueSante = 100;

                        $($('.progress-bar')[3]).attr('aria-valuenow', valueArgent).html(valueArgent + '€');
                        $($('.progress-bar')[0]).attr('aria-valuenow', valueSante).css('width', valueSante + '%').html(valueSante + '%');
                        $($('.progress-bar')[1]).attr('aria-valuenow', valueEnergie).css('width', valueEnergie + '%').html(valueEnergie + '%');
                    }
                } else {
                    $('#modalInfo .modal-body').html('Vous n\'avez pas assez de sous');
                    $('#modalInfo').modal('show');
                }
            }
            break;
    }
}

function dormir(btn) {
    if (!jeu.dodo && !jeu.actionEnCours) {
        jeu.dodo = true;
        jeu.actionEnCours = true;
        var nbHeureDodo = btn.parentElement.children[0].children[0].value;
        if (nbHeureDodo > 0) {
            $('#dodo').addClass('enCours');
            $('#dodo').text('Dans les bras de morphée...');
            $('#dodo').css('color', 'brown');
            var valueEnergie = parseInt($($('.progress-bar')[1]).attr('aria-valuenow'));
            var i = 0;

            clearTimeout(refreshTimeoutId);

            refreshIntervalId = setInterval(function () {
                    jeu.temps.setHours(jeu.temps.getHours() + 1);
                    valueEnergie = valueEnergie + nbHeureDodo * jeu.plusEnergie * 2;
                    if (parseInt(valueEnergie) > 100)
                        valueEnergie = 100;
                    $($('.progress-bar')[1]).attr('aria-valuenow', valueEnergie).css('width', valueEnergie + '%').html(valueEnergie + '%');

                    if (jeu.temps.getMinutes() > 9)
                        $('#soleil + p').text(jeu.temps.getHours() + ':' + jeu.temps.getMinutes());
                    else
                        $('#soleil + p').text(jeu.temps.getHours() + ':0' + jeu.temps.getMinutes());


                    if ((jeu.temps.getHours() > 19 && jeu.temps.getHours() <= 23) || (jeu.temps.getHours() >= 0 && jeu.temps.getHours() <= 6)) {
                        setNuit();
                    } else {
                        setJour();
                    }

                    i++;
                    if (i == nbHeureDodo) {
                        $('#dodo').removeClass('enCours');
                        resetEtudiant();
                        $('#dodo').text('Dormir');
                        $('#dodo').css('color', '#668485');
                        clearInterval(refreshIntervalId);
                        jeu.dodo = false;
                        jeu.actionEnCours = false;
                        upDate();
                    }
                },
                1000);

            if (localStorage.getItem('sexe') == 'fille')
                $('#etudiant').attr('src', 'img/filleDodo.png');
            else
                $('#etudiant').attr('src', 'img/garconDodo.png');

            $('[data-toggle="popover"]').popover("hide");

        }
    }
}