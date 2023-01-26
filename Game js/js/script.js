const startBtn = document.querySelector("#start"),
    screens = document.querySelectorAll(".screen"),
    timeList = document.querySelector("#time-list"),
    difficultyList = document.querySelector("#difficulty-list"),
    timeEl = document.querySelector("#time"),
    board = document.querySelector("#board"),
    hitsEl = document.querySelector("#hits"),
    accuracyEl = document.querySelector("#accuracy"),
    hitsOver = document.querySelector("#hits-over"),
    accuracyOver = document.querySelector("#accuracy-over"),
    hearts = document.querySelectorAll(".heart"),
    restartBtns = document.querySelectorAll(".restart"),
    fullScreenBtn = document.querySelector("#fullscreen"),
    minimizeBtn = document.querySelector("#minimize");

let time = 0,
    unlimited = false,
    difficulty = 0,
    playing = false,
    hits = 0,
    missed = 0,
    accuracy = 0,
    interval;

startBtn.addEventListener("click", () => {
    screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
    if (e.target.classList.contains("time-btn")) {
        time = parseInt(e.target.getAttribute("data-time"));
        unlimited = e.target.getAttribute("data-unlimited");
        screens[1].classList.add("up");
    }
});

difficultyList.addEventListener("click", (e) => {
    if (e.target.classList.contains("difficulty-btn")) {
        difficulty = parseInt(e.target.getAttribute("data-difficulty"));
        screens[2].classList.add("up");
        startGame();
    }
});

function startGame() {
    playing = true;
    interval = setInterval(decreaseTime, 1000);
    createRandomCircle();
}

function decreaseTime() {
    if (unlimited) {
        //if unlimited was selected
        setTime("∞");
        return;
    }
    if (time === 0) {
        //lets finish game when time reaches 0
        finishGame();
    }
    let current = --time;
    let miliseconds = time * 1000;

    let minutes = Math.floor(miliseconds / (1000 * 60));
    let seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);

    // trailing zero

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    setTime(`${minutes}:${seconds}`);
}

function setTime(time) {
    timeEl.innerHTML = time;
}

function createRandomCircle() {
    if (!playing) {
        //if playing false then do nothing
        return;
    }

    const circle = document.createElement("div");
    const size = getRandomNumber(30, 100);
    const colors = ["#03DAC6", "#FF0266", "3b3ff00", "#ccff00", "#9D00FF"];
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add("circle");
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    let color = Math.floor(Math.random() * 5);
    circle.style.background = `${colors[color]}`;
    board.append(circle);

    //difficulty settings

    if (difficulty === 1) {
        circle.style.animationDuration = "2s";
    } else if (difficulty === 2) {
        circle.style.animationDuration = "1s";
    } else {
        circle.style.animationDuration = "3s";
    }

    //create new circle when current dissapeared

    circle.addEventListener("animationend", () => {
        circle.remove();
        createRandomCircle();

        //circle scale = 0 and user dont click
        //it counts as a miss

        addMissed();
        //also calculate accuracy after miss
        calculateAccuracy();
    });
}

//get event on circle click

board.addEventListener("click", (e) => {
    if (e.target.classList.contains("circle")) {
        //increase hits by 1
        hits++;
        //remove circle
        e.target.remove();
        //create next circle
        createRandomCircle();
    } else {
        //if not clicked on a circle its a miss
        missed++;
    }

    //show hits on document
    hitsEl.innerHTML = hits;
    //let also add accuracy
    calculateAccuracy();
});

function finishGame() {
    playing = false;
    clearInterval(interval);
    board.innerHTML = "";
    screens[3].classList.add("up");
    hitsEl.innerHTML = 0;
    timeEl.innerHTML = "00:00";
    accuracyEl.innerHTML = "0%";

    //update stats

    hitsOver.innerHTML = hits;
    accuracyOver.innerHTML = `${accuracy}%`;
}

function addMissed() {

    //miss = decrease accuracy
    // also miss =  decrease live

    //check if any lives remaining

    if (hearts[0].classList.contains("dead") &&
        hearts[1].classList.contains("dead") &&
        hearts[2].classList.contains("dead")
    ) {
        //if all the hearts are dead 
        finishGame();
    }
    else {
        //if any live remaining
        missed++;

        //add dead to one heart

        for (let i = 0; i < hearts.length; i++) {
            if (!hearts[i].classList.contains("dead")) {
                hearts[i].classList.add("dead");
                //break after adding to one not others
                break;
            }
        }
    }
}

function calculateAccuracy() {
    accuracy = (hits / (hits + missed)) * 100;
    accuracy = accuracy.toFixed(2);
    accuracyEl.innerHTML = `${accuracy}%`
}

function getRandomNumber(min, max) {
    //get random between min and max
    return Math.round(Math.random() * (max - min) + min);
}

restartBtns.forEach((btn) => {
    btn.addEventListener("click", restartGame);
});

function restartGame() {
    finishGame();
    screens[1].classList.remove("up");
    screens[2].classList.remove("up");
    screens[3].classList.remove("up");
    time = 0;
    difficulty = 0;
    hits = 0;
    missed = 0;
    accuracy = 0;
    playing = false;
    unlimited = false;
    hearts.forEach((heart) => {
        heart.classList.remove("dead");
    })
}

fullScreenBtn.addEventListener("click", fullscreen);

let elem = document.documentElement;

function fullscreen() {
    //different browser support different fullscreen function
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }

    //hide full screen btn show minimize btn
    fullScreenBtn.style.display = "none"
    minimizeBtn.style.display = "block"

}

minimizeBtn.addEventListener("click", minimize);

function minimize() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }

    //hide minimize btn show fullscreen btn
    minimizeBtn.style.display = "none"
    fullScreenBtn.style.display = "block"
}