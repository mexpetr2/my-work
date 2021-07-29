"use strict";

var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_UP = 38;
var KEY_DOWN = 40;
var SPACEBAR = 32


var kstate = [false, false, false, false, false];

function togglekey(keyCode, isPressed) {
    if (keyCode == KEY_LEFT) {
        kstate[0] = isPressed;
    }

    if (keyCode == KEY_RIGHT) {
        kstate[1] = isPressed;
    }

    if (keyCode == KEY_UP) {
        kstate[2] = isPressed;
    }

    if (keyCode == KEY_DOWN) {
        kstate[3] = isPressed;
    }

    if (keyCode == SPACEBAR) {
        kstate[4] = isPressed;
    }

}

document.onkeydown = function (evt) {
    togglekey(evt.keyCode, true);
}

document.onkeyup = function (evt) {
    togglekey(evt.keyCode, false);
}
