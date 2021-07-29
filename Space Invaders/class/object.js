"use strict";

var joueurList = [];
var joueurBalle = [];
var vaisseauList = [[], []];
var upgradeList = [];

var SFX_powerUp;
var SFX_joueur_shot;
var SFX_hit_damage;

class Personnage {
    constructor(speed, posx, posy, width, height) {
        this.posx = posx;
        this.posy = posy;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
}

class Joueur extends Personnage {
    constructor(posx, posy) {
        super();
        this.width = 50;
        this.height = 45;
        this.speed = 8.8;
        this.posx = posx;
        this.posy = posy;
        this.lvl = 1;
        this.cooldown = 0;
        this.alive = true;
        joueurList.push(this);
    }

    Afficher() {
        Dessine_p(this.posx, this.posy, '#D4AF37', this.lvl);
    }


    Update() {
        joueur.Deplacement();
        this.cooldown -= 1;
    }


    Tir() {
        this.cooldown = 10;
        if (this.lvl == 1) {
            let balle = new Balle(this.posx, this.posy - 15);

        }
        else if (this.lvl > 1) {
            let balle1 = new Balle(this.posx - 24.5, this.posy - 30);
            let balle2 = new Balle(this.posx + 24.5, this.posy - 30);
            balle1.speed += this.lvl;
            balle2.speed += this.lvl;
            if (this.lvl > 3) {
                balle1.strengh += 1 * this.lvl;
                balle2.strengh += 1 * this.lvl;
                balle1.color = '#00AEFF';
                balle2.color = '#00AEFF';
            }
        }
        if (this.lvl > 2) {
            let balle3 = new Balle(this.posx - 40.5, this.posy - 25);
            let balle4 = new Balle(this.posx + 40.5, this.posy - 25);
            balle3.speed = 7 + this.lvl;
            balle4.speed = 7 + this.lvl;
            if (this.lvl > 3) {
                balle3.strengh += 1 * this.lvl;
                balle4.strengh += 1 * this.lvl;
                balle3.color = '#00AEFF';
                balle4.color = '#00AEFF';
            }
        }
        if (this.lvl == -10) {
            return;
        }
    }

    Deplacement() {
        if (kstate[1] == true && this.posx < canvas.width - this.width/2) {
            this.posx += this.speed;
        }

        if (kstate[0] == true && this.posx > 0 + this.width/2) {
            this.posx -= this.speed ;
        }

        if (kstate[2] == true && this.posy > 0) {
            this.posy -= this.speed;
        }

        else if (kstate[3] == true && this.posy < canvas.height - this.height) {
            this.posy += this.speed;
        }

        if (kstate[4] == true && this.cooldown <= 0) { 
            this.Tir();
        }
    }

    Dead() {
        this.alive = false; 
        joueurList = remove(joueurList, this);
    }



}

class Vaisseau extends Personnage {
    constructor(posx, posy, dir, sx, sy) {
        super();
        this.sx = sx;
        this.sy = sy;
        this.posx = posx;
        this.posy = posy;
        this.orientation = ['Down', dir];
        this.alive = true;
        var pv;
    }

    Oriented() {
        if (this.posx <= 0) {
            this.speed += (1 / 10) * this.speed;
            this.orientation[1] = 'Right';
        }

        if (this.posx + this.width >= canvas.width) {
            this.speed += (1 / 10) * this.speed;
            this.orientation[1] = 'Left';
        }

        if (this.posy <= 0) {
            this.orientation[0] = 'Down';
        }

        if (this.posy + this.height > canvas.height) {
            this.speed += (1 / 10) * this.speed;
            this.orientation[0] = 'Up';
        }
    }

    Deplacement() {

        if (this.orientation[0] == 'Down') {
            this.posy += this.sy * this.speed;
        }

        if (this.orientation[0] == 'Up') {
            this.posy -= this.sy * this.speed;
        }

        if (this.orientation[1] == 'Right') {
            this.posx += this.sx * this.speed;
        }

        if (this.orientation[1] == 'Left') {
            this.posx -= this.sx * this.speed;
        }
    }
}

class Alien extends Vaisseau {
    constructor(posx, posy, dir, sx, sy) {
        super();
        this.sx = sx;
        this.sy = sy;
        this.posy = posy;
        this.posx = posx;
        this.width = 30;
        this.height = 30;
        this.speed = 8;
        this.orientation = ['Down', dir];
        vaisseauList[0].push(this);
    }

    Damaged() {
        SFX_hit_damage = new sound('SFX/hit_damage.ogg',1);
        SFX_hit_damage.play();
        this.Dead();
    }

    Afficher() {
        Dessine_e(this.posx, this.posy);
    }

    Dead() {
        this.alive = false;
        if (randomInt(0,25) == 1 && upgradeList.length == 0) {
            let upgrade = new Upgrade(this.posx, this.posy)
        }
        vaisseauList[0] = remove(vaisseauList[0], this);
        
    }

    SpeedCap() {
        if (this.speed >= 30) {
            this.speed = 30;
        }
    }

    Update() {
        this.Oriented();
        this.SpeedCap();
        this.Deplacement();
    }
}

class Boss extends Vaisseau {
    constructor(posx, posy, dir, sx, sy) {
        super();
        this.sx = sx;
        this.sy = sy;
        this.posx = posx;
        this.posy = posy;
        this.width = 250;
        this.height = 250;
        this.speed = 15;
        this.pv = 500;
        this.orientation = ['Down', dir];
        this.color1 = '#2194ab'
        this.color2 = '#ffffff'
        this.inDamageTime = 0;
        this.inDeathAnimation = -100;
        this.invisibility = false;
        this.alive = true;
        this.cooldown = 0;
        this.alpha = 1;
        vaisseauList[1].push(this);
    }

    Damaged() {
        this.inDamageTime = 5;
        if (this.sy == 0) {
            if (this.invisibility == false) {
                this.pv -= 1;
                this.color1 = '#ff0000';
                this.color2 = '#ff0000';
            }
            else {
                this.color1 = '#b9f2ff';
                this.color2 = '#b9f2ff';
            }
            if (this.pv <= 0) {
                this.inDeathAnimation = 499;
            }
        }
        
    }

    Death_Animation() {
        this.alive = false;
        vaisseauList[0] = [];
        joueur.lvl = -10;
        Dessine_boss_death_animation(this.posx, this.posy);
        this.inDeathAnimation -= 1;
        if (this.inDeathAnimation <= 0) {
            this.Dead();
        }
    }

    Dead() {
        vaisseauList[1] = remove(vaisseauList[1], this);
        state = 'WIN';
    }

    Afficher() {
        Dessine_boss(this.posx, this.posy, this.color1, this.color2, this.alpha);
        if (this.sy == 0) {
            Dessine_life_bar(this.pv);
            if (this.invisibility == true) {
                Dessine_circle(this.posx, this.posy);
            }
        }
        
    }

    Spawn(){
        if (this.cooldown == 0 && this.pv / 500 > 0.75) {
            let larva1 = new Alien(this.posx, this.posy + this.height, 'Left', 1 / 2, 1 / 4);
            let larva2 = new Alien(this.posx + this.width, this.posy + this.height, 'Right', 1 / 2, 1 / 4);
            this.invisibility = true;
            this.cooldown = 400;
        }
        else if (this.cooldown == 0 && this.pv / 500 > 0.50) {
            let larva1 = new Alien(this.posx, this.posy + this.height, 'Left', 1, 1 / 4);
            let larva2 = new Alien(this.posx + this.width, this.posy + this.height, 'Right', 1, 1 / 4);
            this.invisibility = true;
            this.cooldown = 300;
        }
        else if (this.cooldown == 0 && this.pv / 500 > 0.25) {
            let larva1 = new Alien(this.posx, this.posy + this.height, 'Left', 1 / 2, 1 / 4);
            let larva2 = new Alien(this.posx + this.width, this.posy + this.height, 'Right', 1 / 2, 1 / 4);
            let larva3 = new Alien(this.posx, this.posy + this.height, 'Left', 1, 1 / 4);
            let larva4 = new Alien(this.posx + this.width, this.posy + this.height, 'Right', 1, 1 / 4);
            this.invisibility = true
            this.cooldown = 250;
        }
        else if (this.cooldown == 0 && this.pv / 500 > 0) {
            let larva1 = new Alien(this.posx, this.posy + this.height, 'Left', 1 / 2, 1 / 4);
            let larva2 = new Alien(this.posx + this.width, this.posy + this.height, 'Right', 1 / 2, 1 / 4);
            let larva3 = new Alien(this.posx, this.posy + this.height, 'Left', 1, 1 / 4);
            let larva4 = new Alien(this.posx + this.width, this.posy + this.height, 'Right', 1, 1 / 4);
            this.cooldown = 150;
        }
        if (vaisseauList[0].length == 0) {
            this.invisibility = false;
        }
    }

    Update() {
        if (this.posy >= -75) {
            this.sy = 0;
        }
        this.Oriented();
        this.Deplacement();
        if (this.sy == 0) {
            this.Spawn();
            this.inDamageTime -= 1;
            if (this.inDamageTime <= 0) {
                this.color1 = '#2194ab';
                this.color2 = '#ffffff';
            }
            this.cooldown -= 1;
        }
        if (this.inDeathAnimation >= 0) {
            this.Death_Animation();
        }
    }
}

class Balle {
    constructor(posx, posy) {
        this.posx = posx - 5;
        this.posy = posy - 5;
        this.width = 10;
        this.height = 10;
        this.speed = 8.8;
        this.activeFrame = 40;
        this.velocity = (1 / 100) * this.speed;
        this.strengh = 1;
        this.color = '#ffffff';
        joueurBalle.push(this);

        SFX_joueur_shot = new sound('SFX/player_shot.ogg', 0.4);
        SFX_joueur_shot.play();
    }

    inBounds() {
        return this.posy > 0 && this.posy < canvas.height;
    }

    Afficher() {
        if (this.inBounds() == true) {
            DessineBalle(this.posx, this.posy, this.width, this.color);
        }
    }

    Deplacement() {
        if (this.speed > 0) {
            this.posy -= this.speed;
        }
    }


    Update() {
        this.speed -= this.velocity;
        this.Deplacement();
        this.activeFrame -= 1;
    }
}

class Upgrade extends Personnage {
    constructor(posx, posy) {
        super();
        this.posx = posx;
        this.posy = posy;
        this.width = 30;
        this.height = 14;
        this.PowerUpDessineTimer = 0;
        this.getPowerUp = false;
        this.SFX_played = false;
        upgradeList.push(this);
    }

    Afficher() {
        if (this.getPowerUp == false) {
            Dessine_Upgrade(this.posx, this.posy);
        }
        if (this.PowerUpDessineTimer > 0) {
            Dessine_powerUp(joueur.posx, joueur.posy + 10);
            if (this.PowerUpDessineTimer == 1) {
                this.Disapear();
            }
        }
    }

    PowerUp() {
        if (this.SFX_played == false) {
            SFX_powerUp = new sound('SFX/powerUp.ogg', 1);
            SFX_powerUp.play();
            this.SFX_played = true;
            joueur.lvl += 1;
            joueur.speed = 6.8;
        }
        this.getPowerUp = true;
        this.PowerUpDessineTimer = 12;
    }

    Deplacement() {
        this.posy += 2;
    }

    Disapear() {
        upgradeList = remove(upgradeList, this);
    }

    Update() {
        this.Deplacement();
        if (this.posy > 620) {
            this.Disapear();
        }
        this.PowerUpDessineTimer -= 1;
    }
}

function collision(p, obj) {
    if (p.posy > (obj.posy + obj.height) ||
        p.posy + p.height < obj.posy ||
        p.posx + (p.width / 2) < obj.posx ||
        p.posx - (p.width / 2) > obj.posx + obj.width) {
        return false;
    }
    else {
        return true;
    }
}

