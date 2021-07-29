"use strict";

var state = "PLAY";
var wave = 1;

function refreshState() {
    if (joueurList.length < 1) {
        state = "GAMEOVER";
    }
    wave += 1;
    vaisseauWaves(wave);
}

function vaisseauWaves(i) {
    if (i == 1) {
        let vaisseau1 = new Alien(100, 100, 'Right', 1, 1 / 7);
        let vaisseau2 = new Alien(canvas.width - 120, 100, 'Left', 1, 1 / 7);
    }
    else if (i == 300) {
        let vaisseau1 = new Alien(100, -20, 'Right', 2 / 3, 1 / 4);
        let vaisseau2 = new Alien(690, -15, 'Left', 2 / 3, 1 / 4);
        let vaisseau3 = new Alien(400, -20, 'Right', 0, 1 / 2);
    }
    else if (i == 550) {
        let vaisseau1 = new Alien(100, -20, 'Right', 0.1, 3 / 5);
        let vaisseau2 = new Alien(150, -10, 'Right', 0.1, 3 / 5);
        let vaisseau3 = new Alien(200, -20, 'Right', 0.1, 3 / 5);

        let vaisseau4 = new Alien(700, -20, 'Left', 0.1, 3 / 5);
        let vaisseau5 = new Alien(650, -10, 'Left', 0.1, 3 / 5);
        let vaisseau6 = new Alien(600, -20, 'Left', 0.1, 3 / 5);
    }
    else if (i == 1100) {
        let vaisseau1 = new Alien(100, -10, 'Right', 0.7 / 1.5, 4 / 7);
        let vaisseau2 = new Alien(80, -70, 'Right', 0.6 / 1.4, 4 / 7);
        let vaisseau3 = new Alien(60, -130, 'Right', 0.5 / 1.3, 4 / 7);
        let vaisseau4 = new Alien(40, -190, 'Right', 0.4 / 1.2, 4 / 7);
        let vaisseau5 = new Alien(20, -250, 'Right', 0.3, 4 / 7);
        let vaisseau6 = new Alien(1, -310, 'Right', 0.27, 4 / 7);
    }
    else if (i == 1250) {
        let vaisseau7 = new Alien(700, -10, 'Left', 0.7 / 1.5, 1 / 2);
        let vaisseau8 = new Alien(710, -70, 'Left', 0.6 / 1.4, 1 / 2);
        let vaisseau9 = new Alien(720, -130, 'Left', 0.5 / 1.3, 1 / 2);
        let vaisseau10 = new Alien(730, -190, 'Left', 0.4 / 1.2, 1 / 2);
        let vaisseau11 = new Alien(740, -250, 'Left', 0.3, 1 / 2);
        let vaisseau12 = new Alien(750, -310, 'Left', 0.27, 1 / 2);
    }
    else if (i == 1550) {
        let vaisseau1 = new Alien(-80, 130, 'Right', 0.1, 1 / 7);
        let vaisseau2 = new Alien(-140, 70, 'Right', 0.1, 1 / 7);
        let vaisseau3 = new Alien(-200, 10, 'Right', 0.1, 1 / 7);
        let vaisseau4 = new Alien(-260, -50, 'Right', 0.1, 1 / 7);
        let vaisseau5 = new Alien(-320, -110, 'Right', 0.1, 1 / 7);

        let vaisseau6 = new Alien(880, 130, 'Right', 0.1, 1 / 7);
        let vaisseau7 = new Alien(940, 70, 'Right', 0.1, 1 / 7);
        let vaisseau8 = new Alien(1000, 10, 'Right', 0.1, 1 / 7);
        let vaisseau9 = new Alien(1060, -50, 'Right', 0.1, 1 / 7);
        let vaisseau10 = new Alien(1120, -110, 'Right', 0.1, 1 / 7);
    }
    else if (i == 1950) {
        let vaisseau1 = new Alien(-80, 650, 'Right', 0.2, 1 / 14);
        let vaisseau2 = new Alien(-120, 670, 'Right', 0.19, 1 / 14);
        let vaisseau3 = new Alien(-160, 690, 'Right', 0.18, 1 / 14);
        let vaisseau4 = new Alien(-200, 710, 'Right', 0.17, 1 / 14);
        let vaisseau5 = new Alien(-240, 730, 'Right', 0.16, 1 / 14);

        let vaisseau6 = new Alien(880, 650, 'Left', 0.2, 1 / 14);
        let vaisseau7 = new Alien(920, 670, 'Left', 0.19, 1 / 14);
        let vaisseau8 = new Alien(960, 690, 'Left', 0.18, 1 / 14);
        let vaisseau9 = new Alien(1000, 710, 'Left', 0.17, 1 / 14);
        let vaisseau10 = new Alien(1040, 730, 'Left', 0.16, 1 / 14);
    }

    else if (i > 2100 && i < 3700) {
        if (i % 400 == 0) {
            var x = randomInt(0, 800);
            var y = randomInt(0, 300);
            var speed_a1 = Math.random(0.2, 1);
            var speed_b1 = Math.random(0.2, 1)

            var speed_a2 = Math.random(0.4, 0.6);
            var speed_b2 = Math.random(0.1, 0.2)

            var speed_a3 = Math.random(0.4, 0.6);
            var speed_b3 = Math.random(0.1, 0.2)


            if (x > 400) {
                let vaisseau1 = new Alien(x, -20, "Right", speed_a1, speed_b1);
                let vaisseau2 = new Alien(-20, y, "Right", speed_a2, speed_b2);
                let vaisseau3 = new Alien(820, y, "Left", speed_a3, speed_b3);
            }
            else {
                let vaisseau1 = new Alien(x, -20, "Left", speed_a1, speed_b1);
                let vaisseau2 = new Alien(-20, y, "Right", speed_a2, speed_b2);
                let vaisseau3 = new Alien(820, y, "Left", speed_a3, speed_b3);
            }
        }
    }
    if (i == 3500) {
        let boss = new Boss(275, -400, 'Right', 0, 1 / 10);
    } 
}

function Win() {
    Clear();
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = '#D4AF37'
    ctx.font = '30px Arial';
    ctx.stroke();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Tu as gagné !', (canvas.width / 2) - 60, (canvas.height / 2))
    ctx.strokeText('Tu as gagné !', (canvas.width / 2) - 60, (canvas.height / 2));
    
}

function GameOver() {
    Clear();
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'red';
    Dessine_p(joueur.posx, joueur.posy, 'red');
    ctx.stroke();

    ctx.fillStyle = 'red';
    
    ctx.font = '30px Arial';
    ctx.fillText('Tu as perdu !', (canvas.width / 2) - 75, (canvas.height / 2));
    ctx.strokeText('Tu as perdu !', (canvas.width / 2) - 75, (canvas.height / 2));

    
}

function Restart() {
    Clear();
    wave = 1;

    emptyList();
    joueur = null;
    state = 'PLAY';

    load();
}