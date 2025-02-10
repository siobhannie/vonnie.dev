//UGHGHHGHGHGHGHHGHGH

var add = 0.004;
var x = add;
const padge = 100;
const content_delay = 500;

var xterval = 0;
var aniterval = 0;

var firstDoneMain = false;

function easeOutCirc(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function easeInCirc(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
}

String.prototype.visualLength = function() {
    var ruler = document.getElementById("ruler");
    ruler.innerHTML = this;
    return ruler.offsetWidth;
}

window.addEventListener("load", (event) => {
    var message;
    let viewport_width = document.documentElement.clientWidth;
    console.log(viewport_width);
    let i = "i";
    while (true) {
	message = "H" + i + " :3";
	console.log(message.visualLength() + message);
	if(message.visualLength() >= (viewport_width - padge)) {
	    break;
	} else {
	    i += 'i';
	}
    }
    var left_pointer = 0;
    var right_pointer = message.length - 1;
    var front = document.getElementById("front");
    var back = document.getElementById("back");
    xnterval = setInterval(() => {
	x += add;
	if(x >= 0.9) {
	    add *= -1;
	}
	x = Math.min(0.9, Math.max(0, x));
    }, 1);
    aniterval = setInterval(() => {
	var current_n = Math.round((message.length / 2) * easeOutCirc(x));
	if((current_n - front.innerHTML.length) > 0) {
	    front.innerHTML += message[left_pointer];
	    back.innerHTML = message[right_pointer] + back.innerHTML;
	    left_pointer += 1;
	    right_pointer -= 1;
	}
	if((current_n - front.innerHTML.length) < 0) {
	    if (front.innerHTML != "Hii") {
		front.innerHTML = front.innerHTML.substring(0, front.innerHTML.length - 1);
	    }
	    if (back.innerHTML != " :3") {
		back.innerHTML = back.innerHTML.substring(1, back.innerHTML.length);
	    }
	}
    }, 1);

    setInterval(() => {
	if (x <= 0) {
	    clearInterval(xterval);
	    clearInterval(aniterval);
	}

	if (x <= 0.35 && !firstDoneMain && add < 0) {
	    doMain();
	    firstDoneMain = true;
	}
    }, 100);
});

function doMain() {
    let container = document.getElementById("intro-container");
    let intro = document.getElementById("intro");
    container.classList.remove("animating");
    container.classList.add("done");
    intro.classList.remove("animating");
    intro.classList.add("done");
    setTimeout(doContentReveal, 150);
}

function doContentReveal() {
    let content_lines = document.getElementsByClassName("content-element");
    let step = 1.0 / content_lines.length;
    let y = 0;

    for (const line of content_lines) {
	setTimeout(() => {
	    line.classList.remove("init");
	    line.classList.add("ready");
	}, easeInCirc(y) * content_delay);
	y += step;
    }
}
