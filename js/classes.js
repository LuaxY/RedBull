function jeu() {
    this.temps = new Date();
    this.doubleXp = 1;
    this.actionEnCours = false;
    this.moinsEnergie = 5;
    this.moinsMoinsEnergie = 15;
    this.moinsMoinsMoinsEnergie = 30;
    this.plusEnergie = 5;
    this.moinsMotiv = 5;
    this.plusMotiv = 5;
    this.plusPlusMotiv = 15;
    this.moinsSante = 10;
    this.plusSante = 5;
    this.plusPlusSante = 15;
    this.travaillerLocked = true;
    this.barLocked = true;
    this.barBoiteLocked = true;
    this.barBoiteLockedNuit = true;
    this.salleLocked = true;
    this.habitsLocked = true;
    this.restaurantLocked = true;
    this.specLocked = true;
    this.newDay = false;
    this.dodo = false;
    this.divXpPourcent = 100;
    this.nbRedBull = 3;
}

function etudiant() {
    this.formation = "";
    this.lvl = "B1";
    this.xp = 0;
}