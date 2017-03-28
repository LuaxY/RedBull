function jeu() {
    this.temps = new Date();
    this.doubleXp = 381;
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
    this.travaillerLocked = false;
    this.barBoiteLocked = false;
    this.salleLocked = false;
    this.habitsLocked = false;
    this.restaurantLocked = false;
    this.specLocked = false;
    this.newDay = false;
    this.dodo = false;
    this.divXpPourcent = 100;

}

function etudiant() {
    this.formation = "";
    this.lvl = "B1";
    this.xp = 0;
}