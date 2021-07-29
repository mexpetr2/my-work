"use strict";

const cycleLoop = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12];

var currentLoopIndex = 0;

var scale = 1.5;
var width = 96;
var height = 96;
var scalewidth = scale * width;
var scaleheight = scale * height;

var boxy = 0;

var img = new Image();
var textBox = new Image();

function Dessine_p(x, y, clr, lvl) {
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = clr;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 25, y + 45);
    ctx.lineTo(x - 25, y + 45);
    ctx.lineTo(x, y);
    ctx.fill();
    if (lvl > 1) {
        ctx.fillStyle = '#E0EC9B';
        ctx.beginPath();
        ctx.moveTo(x - 24.5 - 3, y - 4);
        ctx.lineTo(x - 24.5, y - 7 - 4);
        ctx.lineTo(x - 24.5 + 3, y - 4);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x + 24.5 - 3, y - 4);
        ctx.lineTo(x + 24.5, y - 7 - 4);
        ctx.lineTo(x + 24.5 + 3, y - 4);
        ctx.fill();
    }
    if (lvl > 2) {
        ctx.fillStyle = '#E0EC9B';
        ctx.beginPath();
        ctx.moveTo(x + 40.5 - 3, y + 20);
        ctx.lineTo(x + 40.5, y - 7 + 20);
        ctx.lineTo(x + 40.5 + 3, y + 20);
        ctx.fill();

        ctx.fillStyle = '#E0EC9B';
        ctx.beginPath();
        ctx.moveTo(x - 40.5 - 3, y + 20);
        ctx.lineTo(x - 40.5, y - 7 + 20);
        ctx.lineTo(x - 40.5 + 3, y + 20);
        ctx.fill();
    }
}

function Dessine_e(x, y) {
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = '#2194ab';
    ctx.strokeStyle = '#2194ab';

    ctx.fillRect(x, y, 30, 30);
}

function Dessine_boss(x, y, color1, color2, a) {
    var ctx = canvas.getContext('2d');

    ctx.globalAlpha = a;

    ctx.fillStyle = color1;
    ctx.fillRect(x+50, y+50, 150, 150);
    ctx.fillRect(x+200, y + 200, 50, 50);
    ctx.fillRect(x, y + 200, 50, 50);

    ctx.fillStyle = color2;
    ctx.strokeStyle = color2;

    ctx.beginPath();
    ctx.moveTo(x+125, y);
    ctx.lineTo(x + 250, y + 125);
    ctx.lineTo(x + 125, y +250);
    ctx.lineTo(x, y + 125);
    ctx.fill();

}
function Dessine_circle(x, y) {
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = '#b9f2ff';
    ctx.beginPath();
    ctx.arc(x+125, y+125, 200, 0, 2 * Math.PI);
    ctx.stroke();
}

function Dessine_boss_death_animation(x, y) {

    img.src = 'image/Explosion.png';
    img.onload = function () {
        init();
    };

    const ctx = canvas.getContext('2d');

    function DessineFrame(frameX, frameY, canvasX, canvasY) {
        ctx.DessineImage(img, frameX * width, frameY * height, width, height, canvasX, canvasY, scalewidth, scaleheight);
    }

    function explosion() {
        DessineFrame(cycleLoop[currentLoopIndex], 0, x, y);
        DessineFrame(cycleLoop[currentLoopIndex - 20], 0, x + 150, y + 120);
        DessineFrame(cycleLoop[currentLoopIndex - 60], 0, x + 75, y + 70);
        DessineFrame(cycleLoop[currentLoopIndex - 40], 0, x, y + 120);
        currentLoopIndex += 1;
        if (currentLoopIndex >= 94) {
            currentLoopIndex = 0 ;
        }
    }

    function init() {
        window.requestAnimationFrame(explosion)
    }
}

function Dessine_text_box() {
    textBox.src = 'image/text_box.jpg';
    var ctx = canvas.getContext('2d');

    ctx.DessineImage(textBox, 0, 0, 240, 160, 45, 150, 240 * 3, 160 * boxy);
    if (boxy < 2.5) {
        boxy += 0.1;
    }
}

function Dessine_boss_monolog() {
    
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = '#12B573';
    ctx.font = '24px Arial';
    ctx.fillText("j'ai déja planifié ma revanche et elle n'échoura pas ", 100, 500);
    ctx.fillText("HAHAHAHAHHHAHHAHAHAHAHAAHAH", 100, 524);
}

function Dessine_life_bar(pv) {
    var ctx = canvas.getContext('2d');
    if (pv > 0) {
        ctx.fillStyle = '#FF0000';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        pv = pv / 500
        ctx.fillRect(785, 7, 10, 170 * pv);
        ctx.strokeRect(785, 7, 10, 170);
    }
    
}


function Dessine_Upgrade(x,y) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f0bb8c'
    ctx.beginPath();
    ctx.ellipse(x+15, y+15, 15, 7, 0, 0, 2 * Math.PI);
    ctx.fill();
}


function DessineBalle(x,y,rdt,color) {
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + (rdt/2), y + (rdt/2), rdt/2, 0, 2 * Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fill();

}



function Dessine_powerUp(x, y) {
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = '#db323b';
    ctx.font = '14px Origa';
    ctx.strokeText('Power Upgrade', x + 10, y)
}

function Clear() {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 9999, 9999);
}

function sound(src, vol) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = vol;
    document.body.appendChild(this.sound)

    this.play = function () {
        this.sound.play();
    }

    this.stop = function () {
        this.sound.pause();
    }
}