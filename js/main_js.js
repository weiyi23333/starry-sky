var context;
var arr = new Array();
var starCount = 800;
var rains = new Array();
var rainCount = 40;

function init() {
    var stars = document.getElementById("stars");
    windowWidth = window.innerWidth; 
    stars.width = windowWidth;
    stars.height = window.innerHeight;
    context = stars.getContext("2d");
}

var Star = function () {
    this.x = windowWidth * Math.random();
    this.y = 5000 * Math.random();
    this.text = ".";
    this.color = "white";
    this.getColor = function () {
        var _r = Math.random();
        if (_r < 0.5) {
            this.color = "#333";
        } else {
            this.color = "white";
        }
    }
    this.init = function () {
        this.getColor();
    }
    this.draw = function () {
        context.fillStyle = this.color;
        context.fillText(this.text, this.x, this.y);
    }
}

function drawMoon() {
    var moon = new Image();
    moon.src = "../images/moon.jpg"
    context.drawImage(moon, -5, -10);
}

window.onload = function () {
    init();
    for (var i = 0; i < starCount; i++) {
        var star = new Star();
        star.init();
        star.draw();
        arr.push(star);
    }
    for (var i = 0; i < rainCount; i++) {
        var rain = new MeteorRain();
        rain.init();
        rain.draw();
        rains.push(rain);
    }
    drawMoon();
    playStars();
    playRains();
}

function playStars() {
    for (var n = 0; n < starCount; n++) {
        arr[n].getColor();
        arr[n].draw();
    }

    setTimeout("playStars()", 100);
}

var MeteorRain = function () {
    this.x = -1;
    this.y = -1;
    this.length = -1;
    this.angle = 30; 
    this.width = -1;
    this.height = -1;
    this.speed = 1;
    this.offset_x = -1;
    this.offset_y = -1;
    this.alpha = 1; 
    this.color1 = "";
    this.color2 = "";
    this.init = function () {
        this.getPos();
        this.alpha = 1;
        this.getRandomColor();
        var x = Math.random() * 80 + 150;
        this.length = Math.ceil(x);
        this.angle = 30; 
        x = Math.random() + 0.5;
        this.speed = Math.ceil(x);
        var cos = Math.cos(this.angle * 3.14 / 180);
        var sin = Math.sin(this.angle * 3.14 / 180);
        this.width = this.length * cos; 
        this.height = this.length * sin;
        this.offset_x = this.speed * cos;
        this.offset_y = this.speed * sin;
    }
    this.getRandomColor = function () {
        var a = Math.ceil(255 - 240 * Math.random());
        this.color1 = "rgba(" + a + "," + a + "," + a + ",1)";
        this.color2 = "black";
    }
    this.countPos = function () {
        this.x = this.x - this.offset_x;
        this.y = this.y + this.offset_y;
    }
    this.getPos = function () {
        this.x = Math.random() * 10000; 
        this.y = Math.random() * 10000; 
    }
    this.draw = function () {
        context.save();
        context.beginPath();
        context.lineWidth = 1; 
        context.globalAlpha = this.alpha; 
        var line = context.createLinearGradient(this.x, this.y,
            this.x + this.width,
            this.y - this.height);
        line.addColorStop(0, "white");
        line.addColorStop(0.3, this.color1);
        line.addColorStop(0.6, this.color2);
        context.strokeStyle = line;
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y - this.height);
        context.closePath();
        context.stroke();
        context.restore();
    }
    this.move = function () {
        var x = this.x + this.width - this.offset_x;
        var y = this.y - this.height;
        context.clearRect(x - 3, y - 3, this.offset_x + 5, this.offset_y + 5);
        this.countPos();
        this.alpha -= 0.002;
        this.draw();
    }
}

function playRains() {
    for (var n = 0; n < rainCount; n++) {
        var rain = rains[n];
        rain.move();
        if (rain.y > window.innerHeight) {
            context.clearRect(rain.x, rain.y - rain.height, rain.width, rain.height);
            rains[n] = new MeteorRain();
            rains[n].init();
        }
    }
    setTimeout("playRains()", 2);
}

window.addEventListener('scroll', function(){
  let offset = window.pageYOffset;
  document.getElementById('png1').style.transform = 'translateY(' + offset * 0.7 + 'px)';
  document.getElementById('png2').style.transform = 'translateX(' + offset * -0.3 + 'px)';
  document.getElementById('png2').style.transform += 'translateY(' + offset * 0.5 + 'px)';
  document.getElementById('png3').style.transform = 'translateX(' + offset * 0.6 + 'px)';
  document.getElementById('png3').style.transform += 'translateY(' + offset * 0.6 + 'px)';
  document.getElementById('png4').style.transform = 'translateY(' + offset * 0.6 + 'px)';
  document.getElementById('png5').style.transform = 'translateY(' + offset * 0.4 + 'px)';
  document.getElementById('png6').style.transform = 'translateX(' + offset * 0.6 + 'px)';
  document.getElementById('png6').style.transform += 'translateY(' + offset * 1 + 'px)';
  document.getElementById('png8').style.transform = 'translateX(' + offset * -0.6 + 'px)';
  document.getElementById('png8').style.transform += 'translateY(' + offset * 1 + 'px)';
});