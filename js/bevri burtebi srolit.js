//დაპაუზება გაგრძლება,ასე შემდეგ, გადმობრუნების გათიშვა და რეკლამები//
var isAppForeground = true;


function initAds() {
    if (admob) {
        var adPublisherIds = {
            android: {
                banner: "ca-app-pub-9420860145754788/8987554767",
                interstitial: "ca-app-pub-9420860145754788/2887930711"
            }
        };

        var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;

        admob.setOptions({
            publisherId: admobid.banner,
            interstitialAdId: admobid.interstitial,
            // publisherId: "ca-app-pub-3940256099942544/6300978111",  // Required
            //interstitialAdId: "ca-app-pub-3940256099942544/1033173712",  // Optional 
            autoShowBanner: true,
            autoShowInterstitial: false,
            autoShowRewarded: false,
        });

        registerAdEvents();

    }
    else {
        alert('AdMobAds plugin not ready');
    }
}

function onAdLoaded(e) {
    if (isAppForeground) {
        if (e.adType === admob.AD_TYPE.AD_TYPE_BANNER) {
            console.log("New banner received");
        } else if (e.adType === admob.INTERSTITIAL) {
            console.log("An interstitial has been loaded and autoshown. If you want to automatically show the interstitial ad, set 'autoShowInterstitial: true' in admob.setOptions() or remove it");

        } else if (e.adType === admob.AD_TYPE_REWARDED) {
            console.log("New rewarded ad received");
            //  admob.showRewardedAd();
        }
    }
}

function onPause() {
    if (isAppForeground) {
        admob.destroyBannerView();
        isAppForeground = false;
    }

    //ყველა ინტერვალის გათიშვა//
    sacdeliinterval = clearTimeout(sacdeliinterval);
    sacdeli2interval = clearTimeout(sacdeli2interval);
    sacdeli3interval = clearTimeout(sacdeli3interval);
}

function onResume() {
    if (!isAppForeground) {
        //setTimeout(admob.createBannerView, 1);
        setTimeout(admob.requestInterstitialAd, 1);

        isAppForeground = true;
    }
    //ყველა ინტერვალის დამატება//
    sacdeliinterval = setTimeout(sacdeli, 120000);
    sacdeli2interval = setTimeout(sacdeli2, 240000);
    sacdeli3interval = setTimeout(sacdeli3, 480000);
}


function onAdClosed(e) {
    if (isAppForeground) {
        if (e.adType === admob.INTERSTITIAL) {
            isInterstitialReady = false;
            admob.requestInterstitialAd();
        }
    }
}


// optional, in case respond to events
function registerAdEvents() {
    document.addEventListener(admob.events.onAdLoaded, onAdLoaded);
    document.addEventListener(admob.events.onAdClosed, onAdClosed);
    /*
    document.addEventListener(admob.events.onAdFailedToLoad, function (e) { });
    document.addEventListener(admob.events.onAdOpened, function (e) { });
  
    document.addEventListener(admob.events.onAdLeftApplication, function (e) { }); */
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
}



function onDeviceReady() {
    document.removeEventListener('deviceready', onDeviceReady, false);

    initAds();

    screen.orientation.lock('portrait');
    // display a banner at startup
    admob.createBannerView();;
    // request an interstitial ad
    admob.requestInterstitialAd();

    // request a rewarded ad
    admob.requestRewardedAd();

}

document.addEventListener("deviceready", onDeviceReady, false);


var canvas = document.querySelector("canvas");
c = canvas.getContext("2d");

//canva width height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//ფერები//
var colorArray = [
    "#03F242",
    "#02EFFC",
    "#FCE903",
    "#FC0396",
    "#B7A15C",
    "#F87400",
    "#E53530",
    "#B116A0",
    "#109A24",
    "#1EAEA4",
    //ახალი დამატებული//
    "#4f0252",
    "#eb1400",
    "#856954",
    "#00ad0e",
    "#00177d",
    "#ad00b3",
    "#d9d61a",
    "#076101",
    "#11d104",
    "#7fe39b",
    "#7fe3be",
    "#191f29",
    "#a10857",
    "#4f082d",
    "#c43543",
    "#ebdd17",
    "#ab6400",
    "#001869",
    "#97a1c2",
    "#83c7b0",
    "#fcb900",
    "#00ff37",
    "#e81031"
];


//გარეთა ფერები//
var strokeColorArray = [
    "#0f03fc",
    "#523b0a",
    "#e89e00",
    "#65e800",
    "#ed4264",
    "#243b55",
    "#ffd89b",
    "#19354d",
    "#d7d9a3",
    "#a0f2e7",
    "#c268de",
    "#5f067a",
    "#610659",
    "#300008",
    "#919191",
    "#33538f",
    "#3b060e",
    "#0008fc",
    "#4a6b3f",
    "#a33a0d",
    "#f06f37",
    "#3b0903"
];

// ქულა//
var score = 0;

//ქულების შენახვა//

function saveScore() {
    if (score > localStorage.getItem("score")) {
        localStorage.setItem("score", JSON.stringify(score));
    }
}

//ქულების გამოჩენა//
function loadScore() {
    if (localStorage.getItem("score") != null) {
        var scores = JSON.parse(localStorage.getItem("score"));
        var list = document.getElementById("list");
        list.innerText = scores;
    }
}

//ქულების გასუფთავება//
var clearScore = document.getElementById("clear");
clearScore.addEventListener("click", ClearScores);
function ClearScores() {
    localStorage.removeItem("score");
    var list = document.getElementById("list");
    list.innerText = 0;
}


//სროლები//
shoot = 10;
//ქლიქების დათვლა//
var counter = 0;
var btncounter = 0;
//ორჯერ ეჭირებაა გასარკვევია რატო დაკლიკებაზე რეკლამა//
window.addEventListener("click", counterClick);
function counterClick() {
    if (counter == 55) {
        counter++;
        counter = 0;
        admob.showInterstitialAd();
    } else {
        counter++;
    }
}

//სამჯერ დარესტარტებაზე ირთვება რეკლამა //
function btncounterClick() {
    if (btncounter == 3) {
        btncounter = 0;
        admob.showInterstitialAd();

    }
}

//მაუსის კოორდინატები//

var mouse = {
    x: undefined,
    y: undefined,
};

window.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// პიტაგორას თეორია //

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

//რანდომი//
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}




//ფინალზე გამოჩენა გადასაკეთებელია//
var yourScore = document.getElementById("yourScore");
var yourBest = document.getElementById("theBest");

//ბურთების ზომა სიჩქარე რადიუსი
function Particle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.mass = this.radius * this.radius * this.radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.strokeColor =
        strokeColorArray[Math.floor(Math.random() * strokeColorArray.length)];



    this.draw = function () {
        //ბურთი//
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.lineWidth = 6;
        c.strokeStyle = this.strokeColor;
        c.stroke();
        c.closePath();

        //ხაზი და მაგის გაწითლება//
        /*
            c.beginPath();
            c.moveTo(canvas.width - 0, canvas.height - (canvas.height - 46));
            c.lineTo(0, canvas.height - (canvas.height - 46));
            c.strokeStyle = "black";
            c.stroke();
        
            if (shoot < 3) {
              c.beginPath();
              c.moveTo(canvas.width, canvas.height - (canvas.height - 46));
              c.lineTo(0, canvas.height - (canvas.height - 46));
              c.strokeStyle = "red";
              c.stroke();
            } */

        if (shoot === 0) {
            canvas.removeEventListener("click", circleShoot);
            //ღილაკების გამოჩენა//
            yourScore.innerText = "Your score: " + score;
            yourBest.innerText = "The best : " + localStorage.getItem("score"),
                yourBest.style.display = "block";
            yourScore.style.display = "block";
            final.style.display = "block";
            //ყველა იბურთის დამატების გათიშვა//
            sacdeliinterval = clearTimeout(sacdeliinterval);
            sacdeli2interval = clearTimeout(sacdeli2interval);
            sacdeli3interval = clearTimeout(sacdeli3interval);

        }


    };


    this.update = (particles) => {
        this.draw();

        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue;
            if (
                getDistance(this.x, this.y, particles[i].x, particles[i].y) -
                this.radius * 2 <
                10
            ) {

                particles[i].color = this.strokeColor;
                particles[i].strokeColor = this.color;
                this.dx += 0.1;
                particles[i].dx -= 0.1;
                this.dy += 0.1;
                particles[i].dy -= 0.1;
                this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

                //რაღაცა ესეთის დამატება შეილება//
                /*
                particles[i].radius += 1;
                if (particles[i].radius = max) {
                  break;
                }
        */
            }



        }


        if (this.x + radius > canvas.width || this.x - radius < 10) {
            this.dx = -this.dx;
        }
        if (this.y + radius > canvas.height || this.y - radius < 0) {
            this.dy = -this.dy;
        }
        //interactivity//
        this.x += this.dx;
        this.y += this.dy;
    };
}

//ქულა და სროლა//
var shootType = document.getElementById("shoot");
var scoreType = document.getElementById("score");


//გრავიტაციის ბურთი//

function Ball(x, y, dx, dy, radius,) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]; //სხვა ფერები უნდა ვიჩალიჩო
    this.strokeColor =
        strokeColorArray[Math.floor(Math.random() * strokeColorArray.length)];

    this.paint = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.lineWidth = 6;
        c.strokeStyle = this.strokeColor;
        c.stroke();
        c.closePath();

        //ქულა და სროლა//

        shootType.innerText = "Shoot: " + shoot;
        shootType.style.display = "block";
        scoreType.innerText = "Score: " + score;
        scoreType.style.display = "block";

        //გამოსახულებები გამხნევებები//
        var wishType = document.getElementById("wish");
        var shooting = document.getElementById("shooting");
        /*
            if (score > 10 && score < 15 && shoot != 0) {
              wishType.innerText = "Gios dzalian uyvarxar";
              wishType.style.display = "block";
            } else if (score > 15 && score < 25 && shoot != 0) {
              wishType.innerText = "dzalian dzalian uyvarxar <3";
              wishType.style.display = "block";
            }
            else {
              wishType.innerText = "";
              wishType.style.display = "none";
            }
        */

        if (shoot < 2 && shoot != 0) {
            shootType.innerText = "Last Shoot";
            shootType.style.color = "red";
            /* shooting.innerText = "One Last Shoot"; */
            shooting.style.display = "block";
            wishType.style.display = "none";
        } else {
            shooting.style.display = "none";
        }
    };

    //this.dy-ით თუ შევცვლი 500 არ გაიჭედება დაბლა// 
    this.gravity = function () {
        this.paint();
        if (this.y + this.radius > canvas.height) {
            this.dy = -this.dy;  //ეს გამრავლებისას ხტუნაობას აჩერებს  * 0.9//

        } else {
            this.dy += 0.3;
        }

        //კიდეებზე რო არ გადავიდეს//
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }

        // this.x += this.dx; ამას თუ დავამატებ მარჯვნივ მარცხნივ გადაიწევა random(-2,2)
        this.x += this.dx;
        this.y += this.dy;


        //ერთმანეთტან ურთიერთქმედება გრავიტაციის ბურთების//
        for (let i = 0; i < balls.length; i++) {
            if (this === balls[i]) continue;
            if (
                getDistance(this.x, this.y, balls[i].x, balls[i].y) -
                this.radius * 2 <
                5
            ) {
                balls[i].color = this.strokeColor;
                balls[i].strokeColor = this.color;
                this.dx += 0.1;
                balls[i].dx -= 0.1;
                this.dy += 0.2;
                balls[i].dy -= 0.2;
                balls[i].dy += 0.1;
                this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

                /*balls[i].color = this.strokeColor;
                balls[i].strokeColor = this.color;
                   balls.color = colorArray[Math.floor(Math.random() * colorArray.length)];
                this.color = colorArray[Math.floor(Math.random() * colorArray.length)]; */
            }
        }


    };
}



particles = [];
balls = [];

function init() {

    //გრავიტაციის ბურრთები აქედან 3 იწყება//
    for (var i = 0; i < 3; i++) {
        var radius = 45;
        var x = randomIntFromRange(50, canvas.width - radius * 2);
        var y = randomIntFromRange(50, canvas.height - radius);
        var dy = randomIntFromRange(4, 7);//5;
        var dx = randomIntFromRange(-2, 2); //0
        balls.push(new Ball(x, y, dx, dy, radius));
    }

    //ბურთები ამით იწყება 3 ბურთით//
    for (let i = 0; i < 2; i++) {
        var radius = 45;
        var x = randomIntFromRange(100, canvas.width - radius);
        var y = randomIntFromRange(canvas.height - 100, canvas.height - radius);
        var dx = randomIntFromRange(2, 6); //(Math.random() - 0.5) * 2;//
        var dy = randomIntFromRange(2, 5); //(Math.random() - 0.5) * 2;//
        particles.push(new Particle(x, y, dx, dy, radius));
    }

}


//უძრავი ბურთების დამატება რომელიც მერე იძვრება //

function moreBall() {
    for (var l = 0; l < 3; l++) {
        var radius = randomIntFromRange(25, 45);//24;
        var x = randomIntFromRange(50, canvas.width - radius);
        var y = randomIntFromRange(50, canvas.height - radius);
        //სიჩქარის მომატება ყოველ დამატებულ ბურთზე
        dx = 0; //(Math.random() - 0.5) * 2;//
        dy = 0;
        //(Math.random() - 0.5) * 2;//
        particles.push(new Particle(x, y, dx, dy, radius));
    }
    if (particles.length + balls.length > 18 || score > 100) {

        clearInterval(ballInterval);
    }
    console.log("moreball");
}

//ჩვეულებრივი ბურთები //
function moreBall1() {
    var radius = 45;// randomIntFromRange(25, 55);//24;
    var x = randomIntFromRange(50, canvas.width - radius);
    var y = randomIntFromRange(50, canvas.height - radius);
    //სიჩქარის მომატება ყოველ დამატებულ ბურთზე
    var dx = randomIntFromRange(4, 9);
    var dy = randomIntFromRange(3, 8);
    particles.push(new Particle(x, y, dx, dy, radius));


    if (particles.length > 12) {
        clearInterval(ball1Interval);
    }

    console.log("moreball1");
}

//გრავიტაციის ბურთები //
function moreBall2() {

    for (var l = 0; l < 2; l++) {
        var radius = randomIntFromRange(25, 45);
        var x = randomIntFromRange(50, canvas.width - radius * 2);
        var y = randomIntFromRange(50, canvas.height - radius);
        var dy = randomIntFromRange(7, 11);//5;
        var dx = randomIntFromRange(-2, 2); //0
        balls.push(new Ball(x, y, dx, dy, radius));
    }

    if (balls.length > 12) {
        clearInterval(ball2Interval);
    }

    console.log("moreball2");
}

//საცდელი ასუფთავებს თამაშს//

function sacdeli() {
    particles = [];
    balls = [];
    for (var l = 0; l < 8; l++) {
        var radius = randomIntFromRange(25, 45);
        var x = randomIntFromRange(50, canvas.width - radius * 2);
        var y = randomIntFromRange(50, canvas.height - radius);
        var dy = randomIntFromRange(4, 15);//5;
        var dx = randomIntFromRange(-2, 5); //0
        balls.push(new Ball(x, y, dx, dy, radius));
    }

    var radius = 45;// randomIntFromRange(25, 55);//24;
    var x = randomIntFromRange(50, canvas.width - radius);
    var y = randomIntFromRange(50, canvas.height - radius);
    //სიჩქარის მომატება ყოველ დამატებულ ბურთზე
    var dx = 0;//randomIntFromRange(5, 9);
    var dy = 0;//randomIntFromRange(3, 8);
    particles.push(new Particle(x, y, dx, dy, radius));

    //გაშეშებულების გაშვება //
    ballInterval = setInterval(moreBall, 20000);

    //ერთი სწრაფის დამატება //
    ball1Interval = setInterval(moreBall1, 25000);

    //ორი გრავიტაციის დამატება //
    ball2Interval = setInterval(moreBall2, 27000);
    console.log("etapi 1");
}


function sacdeli2() {
    particles = [];
    balls = [];
    //ერთი ბურთი პროსტა //
    var radius = randomIntFromRange(25, 45);
    var x = randomIntFromRange(50, canvas.width - radius * 2);
    var y = randomIntFromRange(50, canvas.height - radius);
    var dy = randomIntFromRange(4, 15);//5;
    var dx = randomIntFromRange(-2, 5); //0
    balls.push(new Ball(x, y, dx, dy, radius));


    //ბევრი ბურთები//
    for (let i = 0; i < 8; i++) {
        var radius = 45;
        var x = randomIntFromRange(100, canvas.width - radius);
        var y = randomIntFromRange(canvas.height - 100, canvas.height - radius);
        var dx = randomIntFromRange(2, 6); //(Math.random() - 0.5) * 2;//
        var dy = randomIntFromRange(2, 5); //(Math.random() - 0.5) * 2;//
        particles.push(new Particle(x, y, dx, dy, radius));
    }

    //გაშეშებულების წაშლა //
    clearInterval(ballInterval);
    //ერთი სწრაფის დამატება //
    ball1Interval = setInterval(moreBall1, 25000);
    //ორი გრავიტაციის დამატება //
    ball2Interval = setInterval(moreBall2, 27000);
    console.log(" etapi 2");
}

//ფინალი//
function sacdeli3() {
    particles = [];
    balls = [];
    //ყველა ინტერვალის წაშლა//
    clearTimeout(sacdeliinterval);
    clearTimeout(sacdeli2interval);
    clearInterval(ballInterval);
    clearInterval(ball1Interval);
    clearInterval(ball2Interval);

    for (let i = 0; i < 4; i++) {
        var radius = 45;
        var x = randomIntFromRange(100, canvas.width - radius);
        var y = randomIntFromRange(canvas.height - 100, canvas.height - radius);
        var dx = randomIntFromRange(8, 15); //(Math.random() - 0.5) * 2;//
        var dy = randomIntFromRange(7, 18); //(Math.random() - 0.5) * 2;//
        particles.push(new Particle(x, y, dx, dy, radius));
    }

    for (var l = 0; l < 4; l++) {
        var radius = randomIntFromRange(25, 45);
        var x = randomIntFromRange(50, canvas.width - radius * 2);
        var y = randomIntFromRange(50, canvas.height - radius);
        var dy = randomIntFromRange(8, 18);//5;
        var dx = randomIntFromRange(-2, 9); //0
        balls.push(new Ball(x, y, dx, dy, radius));
    }

    console.log("etapi 3");
}

// მანძილის გამოთვლა ბურთებსა და მაუსს შორის დაკლიკებისას //
function circleShoot() {
    //სროლის ხმა//
    var el = document.getElementById("mine").cloneNode();
    document.body.appendChild(el);
    el.style.display = "block";
    setTimeout(() => {
        el.style.display = "none";
    }, 1200);
    el.style.left = mouse.x - el.offsetWidth / 2 + "px";
    el.style.top = mouse.y - el.offsetHeight / 2 + "px";

    var shotSound = new Audio();
    shotSound.src = "miss.mp3";

    var hitSound = new Audio();
    hitSound.src = "hit.mp3";
    //ხმა//
    var soundHear = false;
    var hitHear = false;

    if (localStorage.getItem("on") != null) {
        turnOn.style.backgroundColor = "green";
        soundHear = true;

    } else {
        soundHear = false;
    }


    if (i !== 0) {
        for (let j = 0; j < particles.length; j++) {
            if (getDistance(particles[j].x, particles[j].y, mouse.x, mouse.y) <
                particles[j].radius
            ) {
                // რადიუს დაკლება ბურთებზე //
                particles[j].radius -= randomIntFromRange(5, 15); //15
                score += 1;
                shoot += 1;
                //მორტყმის ხმა და ნასროლის გაქრობა//
                el.style.display = "none";
                hitHear = true;

            }

        }
        b = balls;
        if (b !== 0) {
            for (var k = 0; k < balls.length; k++) {
                if (getDistance(balls[k].x, balls[k].y, mouse.x, mouse.y) < balls[k].radius) {
                    balls[k].radius -= randomIntFromRange(5, 15); //15
                    score += 1;
                    shoot += 1;
                    //მორტყმის ხმა და ნასროლის გაქრობა//
                    el.style.display = "none";
                    hitHear = true;

                }

            }
        }
        //დაკლიკების მოშორება//
        if (shoot === 0) {
            canvas.removeEventListener("click", circleShoot);
        }
        saveScore();
        shootingRange();
    }

    //ხმების ფუნქცია მორტყმა აცელაზე//
    if (soundHear === true && hitHear === false) {
        shotSound.play();
    } else if (soundHear === true && hitHear === true) {
        hitSound.play();
    }



};


//function game() {//

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    //გრავიტაციის ბურთები//
    for (var b = 0; b < balls.length; b++) {
        balls[b].gravity(balls);
        //გრავიტაციის ბურთების გაქრობა//
        if (balls[b].radius < 25) {
            balls.splice(b, 1);
            score += 1;
            shoot += 1;
        }

        //გრავიტაციის ბურთების დამატება 2ზე ნაკლებზე//
        if (balls.length < 2) {
            for (var i = 0; i < 2; i++) {
                var radius = 45;
                var x = randomIntFromRange(50, canvas.width - radius * 2);
                var y = randomIntFromRange(50, canvas.height - radius);
                var dy = randomIntFromRange(4, 7);//5;
                var dx = randomIntFromRange(-3, 5); //0
                balls.push(new Ball(x, y, dx, dy, radius));
            }
        }
    }

    //ჩვეულებრივი ბურთები//
    for (var i = 0; i < particles.length; i++) {
        particles[i].update(particles);
        /*ბურთების გაქრობა */
        if (particles[i].radius < 25) {
            particles.splice(i, 1);
            shoot += 1;
        }

        //ჩვეულებრივი ბურთების დამატება 2ზე ნაკლებზე//
        if (particles.length < 2) {
            for (let i = 0; i < 2; i++) {
                var radius = 45;
                var x = randomIntFromRange(50, canvas.width - radius);
                var y = randomIntFromRange(50, canvas.height - radius);
                var dx = randomIntFromRange(3, 7); //(Math.random() - 0.5) * 2;//
                var dy = randomIntFromRange(3, 7); //(Math.random() - 0.5) * 2;//
                particles.push(new Particle(x, y, dx, dy, radius));
            }
        }

    }


    //თუ მიმდინარე ქულამ გადააჭარბა საუკეთესოს//
    if (score > localStorage.getItem("score")) {
        scoreType.innerText = "Best: " + score;
    }

}



//თამაშის დაწყება//
var start = document.getElementById("start");
start.addEventListener("click", startGame);

//ან ესეთსავე ფუნქციას დავწერ სხვა სახელით აქ სავარაუდოდ ფერის არჩევა დავამატო ბექგრაუნდზე და მოგვარდება//
function startGame() {
    init();
    animate();
    canvas.style.display = "block";
    canvas.addEventListener("click", circleShoot);
    main.style.display = "none";

    //საცდელები//
    sacdeliinterval = setTimeout(sacdeli, 60000);
    sacdeli2interval = setTimeout(sacdeli2, 120000);
    sacdeli3interval = setTimeout(sacdeli3, 240000);
    //გაშეშებულების დამატება //
    //ballInterval = setInterval(moreBall, 2000);

    //ერთი სწრაფის დამატება //
    // ball1Interval = setInterval(moreBall1, 1500);

    //ორი გრავიტაციის დამატება //
    //ball2Interval = setInterval(moreBall2, 3000);

    //დაწყებისას ბანერის რეკლამას აშორებს//
    admob.destroyBannerView();
}

//ფერები canvas style display block css-ში და ცვლის background-საც//

loadRedColor();
loadGreenColor();
loadLightCoral();
loadMaroon();
loadGray();


//ღილაკები და მენიუ //
var exitt = document.getElementById("exit");
var quitMain = document.getElementById("quit");
var restart = document.getElementById("rest");
//ტავარი მენიუ//
var main = document.getElementById("main");
var final = document.getElementById("final");
var option = document.getElementById("option");
var sound = document.getElementById("sound");
var optionsMenu = document.getElementById("optionsMenu");
var backbtn = document.getElementById("back");
//best menu//
var best = document.getElementById("best");
var bestmeniu = document.getElementById("bestmenu");
var bestback = document.getElementById("bestback");

//option menu//
var save = document.getElementById("save");
var turnOn = document.getElementById("turnOn");
var turnOff = document.getElementById("turnOFF");
//ფერები//
var redColor = document.getElementById("red");
var greenColor = document.getElementById("green");
var lightCoralColor = document.getElementById("lightcoral");
var maroonColor = document.getElementById("maroon");
var lighgrayColor = document.getElementById("lighgray");
var bodyBackground = document.body;



//ინტრო და თამაში//

const fullGame = document.getElementById("game");
const splash = document.getElementById("splash");

window.addEventListener('DOMContentLoaded', (e) => {
    setTimeout(() => {
        splash.style.display = "none";
        fullGame.style.display = "block";
    }, 3500); //3500
});

//გაგრძელება//

/*var Conte = document.getElementById("continiue");
//გაგრძელება//
Conte.addEventListener("click", conteGame);



function conteGame() {
  //აქ ეს უნდა იყოს გასარკვევია admob.showRewardedAd();
  shoot = 2;
  canvas.addEventListener("click", circleShoot);
  final.style.display = "none";
  yourBest.style.display = "none";
  yourScore.style.display = "none";
  ballInterval = setInterval(moreBall, 15000);
  ball1Interval = setInterval(moreBall1, 20000);
  cntcounter++;
  admob.showInterstitialAd();
}
*/
var cntcounter = 0;

function cntcounterClick() {
    if (cntcounter == 2) {
        cntcounter = 0;
        Conte.removeEventListener("click", conteGame);
        console.log("ctntt");
    }
}


//გამოსვლა//
exitt.addEventListener("click", exitOption);
quitMain.addEventListener("click", mainOption);

function exitOption() {
    navigator.app.exitApp();
}

function mainOption() {
    location.reload();
}

//რესტარტი//
restart.addEventListener("click", restartGame);
function restartGame() {
    shoot = 10;
    score = 0;
    canvas.addEventListener("click", circleShoot);
    final.style.display = "none";
    yourBest.style.display = "none";
    yourScore.style.display = "none";
    meniuButton();
    particles = [];
    balls = [];
    init();
    //საცდელები//
    sacdeliinterval = setTimeout(sacdeli, 60000);
    sacdeli2interval = setTimeout(sacdeli2, 120000);
    sacdeli3interval = setTimeout(sacdeli3, 240000);

    //click მთვლელი რეკლამის გამოსაჩენად//
    btncounterClick();
    btncounter++;
}


//ოპციები//
option.addEventListener("click", soundOption);
function soundOption() {
    main.style.display = "none";
    optionsMenu.style.display = "block";
}

backbtn.addEventListener("click", backFuntion);
function backFuntion() {
    main.style.display = "block";
    optionsMenu.style.display = "none";
}



//ხმის ჩართვა//
var turonOnBackground = turnOn;
var turnOffBackground = turnOff;
turnOn.addEventListener("click", turnOnSave);

function turnOnSave() {
    localStorage.setItem("on", JSON.stringify(turnOn));
    localStorage.setItem("onGreen", JSON.stringify(turonOnBackground));
    turonOnBackground.style.backgroundColor = "green";
    localStorage.removeItem("off");
    localStorage.removeItem("onRed");
    turnOff.style.backgroundColor = "red";
    if (localStorage.getItem("onGreen") != null) {
        turnOff.style.backgroundColor = "white";
    }
}

//ხმის გამორთვა//
turnOff.addEventListener("click", turnOffSave);
function turnOffSave() {
    localStorage.setItem("off", JSON.stringify(turnOff));
    localStorage.setItem("onRed", JSON.stringify(turnOffBackground));
    turnOffBackground.style.backgroundColor = "red";
    localStorage.removeItem("on");
    localStorage.removeItem("onGreen");
    turnOn.style.backgroundColor = "green";
    if (localStorage.getItem("onRed") != null) {
        turnOn.style.backgroundColor = "white";
    }
}

//სროლის დაკლება//
function shootingRange() {
    shoot -= 1;
}

//მენიუს ხმა//

const buttons = document.getElementsByTagName("button");
for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    button.onclick = function () {
        var btnsound = new Audio();
        btnsound.src = "button.mp3";
        if (localStorage.getItem("on") != null) {
            btnsound.play();
            turnOn.style.backgroundColor = "green";
        } else {
            btnsound.pause();
        }
    };
}


function meniuButton() {
    var btnsound = new Audio();
    btnsound.src = "button.mp3";
    btnsound.play();
}




//საუკეთესო ქულა//
best.addEventListener("click", bestScore);
function bestScore() {
    main.style.display = "none";
    bestmeniu.style.display = "block";
    loadScore();
}

//მენიუში დაბრუნება//
bestback.addEventListener("click", backbest);
function backbest() {
    main.style.display = "block";
    bestmeniu.style.display = "none";
}

//background-ის ფერები//
//წითელი//
redColor.addEventListener("click", redColorSave);

function redColorSave() {
    localStorage.setItem("red", JSON.stringify(redColor));
    canvas.style.backgroundColor = "#42275a";

    redColor.style.border = "7px solid black";
    greenColor.style.border = "none";
    lightCoralColor.style.border = "none";
    maroonColor.style.border = "none";
    lighgrayColor.style.border = "none";

    //localStorage-იდან წაშლა//
    let colorsToRemove = [
        "green",
        "lightcoral",
        "maroon",
        "gray",
        "bodyGreen",
        "bodyCoral",
        "bodyMaroon",
        "bodyGray",
    ];
    for (color of colorsToRemove) {
        localStorage.removeItem(color);
    }
}

function loadRedColor() {
    if (localStorage.getItem("red") != null) {
        canvas.style.backgroundColor = "#42275a";

    }
}

//მწვანე//
greenColor.addEventListener("click", greenColorSave);

function greenColorSave() {
    localStorage.setItem("green", JSON.stringify(greenColor));
    canvas.style.backgroundColor = "#56ab2f";
    greenColor.style.border = "7px solid black";
    redColor.style.border = "none";
    lightCoralColor.style.border = "none";
    maroonColor.style.border = "none";
    lighgrayColor.style.border = "none";

    //localStorage-იდან წაშლა//
    let colorsToRemove = [
        "red",
        "lightcoral",
        "maroon",
        "gray",
        "bodyRed",
        "bodyCoral",
        "bodyMaroon",
        "bodyGray",
    ];
    for (color of colorsToRemove) {
        localStorage.removeItem(color);
    }
}

function loadGreenColor() {
    if (localStorage.getItem("green") != null) {
        canvas.style.backgroundColor = "#56ab2f";
    }
}

//lightcoral//

lightCoralColor.addEventListener("click", lightcoralSave);
function lightcoralSave() {
    localStorage.setItem("lightcoral", JSON.stringify(lightCoralColor));
    canvas.style.backgroundColor = "#f5574c";
    lightCoralColor.style.border = "7px solid black";
    redColor.style.border = "none";
    greenColor.style.border = "none";
    maroonColor.style.border = "none";
    lighgrayColor.style.border = "none";

    //localStorage-იდან წაშლა//

    let colorsToRemove = [
        "red",
        "green",
        "maroon",
        "gray",
        "bodyGreen",
        "bodyRed",
        "bodyMaroon",
        "bodyGray",
    ];
    for (color of colorsToRemove) {
        localStorage.removeItem(color);
    }
}

function loadLightCoral() {
    if (localStorage.getItem("lightcoral") != null) {
        canvas.style.backgroundColor = "#f5574c";
    }
}

//maroon//

maroonColor.addEventListener("click", maroonSave);
function maroonSave() {
    localStorage.setItem("maroon", JSON.stringify(maroonColor));
    canvas.style.backgroundColor = "#61045f";
    maroonColor.style.border = "7px solid black";
    redColor.style.border = "none";
    greenColor.style.border = "none";
    lightCoralColor.style.border = "none";
    lighgrayColor.style.border = "none";

    //localStorage-იდან წაშლა//
    let colorsToRemove = [
        "red",
        "green",
        "lightcoral",
        "gray",
        "bodyGreen",
        "bodyCoral",
        "bodyRed",
        "bodyGray",
    ];
    for (color of colorsToRemove) {
        localStorage.removeItem(color);
    }
}

function loadMaroon() {
    if (localStorage.getItem("maroon") != null) {
        canvas.style.backgroundColor = "#61045f";
    }
}

//ღიაყავისფერი//
lighgrayColor.addEventListener("click", lighgraySave);
function lighgraySave() {
    localStorage.setItem("gray", JSON.stringify(lighgrayColor));
    canvas.style.backgroundColor = "#bdc3c7";
    lighgrayColor.style.border = "7px solid black";
    redColor.style.border = "none";
    greenColor.style.border = "none";
    lightCoralColor.style.border = "none";
    maroonColor.style.border = "none";

    //localStorage-იდან წაშლა//

    let colorsToRemove = [
        "red",
        "green",
        "lightcoral",
        "maroon",
        "bodyGreen",
        "bodyCoral",
        "bodyMaroon",
        "bodyRed",
    ];
    for (color of colorsToRemove) {
        localStorage.removeItem(color);
    }
}

function loadGray() {
    if (localStorage.getItem("gray") != null) {
        canvas.style.backgroundColor = "#bdc3c7";
    }
}


 //სწორი ხარი//
/*
c.beginPath();
c.moveTo(canvas.width, canvas.height - 40);
c.lineTo(0, canvas.height - 40);
c.strokeStyle = "black";
c.stroke();
//სწორი ხაზი წითლდება 5 სროლაზე ნაკლები   როცა დარჩა სხვაგანაც შეილება ესეთი რაღაცეები დავამატო//
if (shoot < 5) {
  c.beginPath();
  c.moveTo(canvas.width, canvas.height - 40);
  c.lineTo(0, canvas.height - 40);
  c.strokeStyle = "red";
  c.stroke();
} */

    // დასასრული //



//კლასის დამატება//
    //vnaxot.classList.add("words");