"use strict";

var fps = 60

var joueurList = [];
var joueurBalle = [];
var vaisseauList = [[], []];
var upgradeList = [];

var canvas = document.getElementById("game_area");
var joueur = null;

var date = new Date();
var time = date.getTime();


function load() {
    canvas = document.getElementById("game_area");
    joueur = new Joueur(canvas.width / 2, 0.9 * canvas.height);

    vaisseauWaves(wave);
   
    window.setInterval(gameLoop(), 100 / fps)
}

function gameLoop() {
    if (state == "PLAY") {
        UpdateAll();
        Dessine();
        requestAnimationFrame(gameLoop);
        
    }

    else if (state == "WIN") {
        Win();
    }

    else if (state == "GAMEOVER") {
        GameOver();
    }   
}

function UpdateAll() {
    
    joueurList.forEach(function (p) {
        p.Update();
    });

    for (var i = 0; i < 2; i++) {
        vaisseauList[i].forEach(function (e) {
            e.Update();
        });
    }

    upgradeList.forEach(function (u) {
        u.Update();
    });

    joueurBalle.forEach(function (b) {
        b.Update();
    });
    refreshState();
}

function Dessine() {
    Clear();
    joueurBalle.forEach(function (b) {
        b.Afficher();
        if (b.activeFrame <= 0) {
            joueurBalle = remove(joueurBalle, b);
        }

        if (collision(joueur, b)) {
            joueurBalle = remove(joueurBalle, b);
            joueur.Dead();
        }
    });

    upgradeList.forEach(function (u) {
        u.Afficher();
        if (collision(joueur, u)) {
            u.PowerUp();
        }
    })

    for (var i = 0; i < 2; i++) {

        vaisseauList[i].forEach(function (e) {
            e.Afficher();
            if (collision(joueur, e) && e.alive) {
                joueur.Dead();
            }
            joueurBalle.forEach(function (b) {
                if (collision(b, e)) {
                    e.Damaged();
                    joueurBalle = remove(joueurBalle, b);
                }
            })
            if (i == 1) {
                if (e.inDeathAnimation > 150 && e.inDeathAnimation < 400) {
                    Dessine_text_box();
                }
                if (e.inDeathAnimation > 150 && e.inDeathAnimation < 350) {
                    var ctx = canvas.getContext('2d');
                    ctx.font = '20px Arial';
                    ctx.fillStyle = '#12B573';
                    ctx.fillText('Mantheure', 100, 453);
                }
                if (e.inDeathAnimation > 150 && e.inDeathAnimation < 320) {
                    Dessine_boss_monolog();
                }
            }
        });
    }
    joueurList.forEach(function (p) {
        p.Afficher();
    });
}

function remove(arr, value) {
    return arr.filter(function (e) {
        return e != value;
    });
}

function emptyList() {
    joueurList = [];
    vaisseauList = [[],[]];
    joueurBalle = [];
    upgradeList = [];
}

function randomInt(a,b) {
    var min = a;
    var max = b;
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random;
}