/* =========================================================
   FPSX MINI GAME
========================================================= */


const lid =
    document.getElementById("lid");

const timer =
    document.getElementById("timer");

const gameMessage =
    document.getElementById("gameMessage");

const dragHint =
    document.getElementById("dragHint");

const resultBox =
    document.getElementById("resultBox");

const resultText =
    document.getElementById("resultText");

const resultScore =
    document.getElementById("resultScore");


const numberElements = [

    document.getElementById("number1"),

    document.getElementById("number2"),

    document.getElementById("number3")

];


/* =========================================================
   GAME VARIABLES
========================================================= */


let numbers = [];

let roundStartTime = 0;

let roundTimer = null;

let isUnlocked = false;

let isDragging = false;

let lidStartX = 0;

let lidCurrentX = 0;

let pointerStartX = 0;


/*
    Tổng thời gian một lượt:

    30 giây

    0  → 10:
    Vung đang che

    10 → 30:
    Người chơi có thể mở

    30:
    Lượt mới
*/


const ROUND_TIME = 30;

const COVER_TIME = 10;


/*
    Khoảng cách cần kéo để
    vung biến mất.
*/

const LID_REMOVE_DISTANCE = 430;


/* =========================================================
   RANDOM NUMBER
========================================================= */

function randomNumber() {

    return Math.floor(
        Math.random() * 6
    ) + 1;

}


/* =========================================================
   CREATE NEW ROUND
========================================================= */

function startNewRound() {

    console.log("New round");


    /*
        Reset trạng thái
    */

    isUnlocked = false;

    isDragging = false;

    lidCurrentX = 0;


    /*
        Random 3 số
    */

    numbers = [

        randomNumber(),
        randomNumber(),
        randomNumber()

    ];


    /*
        Hiển thị số
    */

    numberElements.forEach(
        (element, index) => {

            element.textContent =
                numbers[index];

        }
    );


    /*
        Reset vung
    */

    lid.classList.remove("hidden");

    lid.classList.remove("unlocked");

    lid.style.transition =
        "none";

    lid.style.transform =
        "translate(-50%, -50%) translateX(0px)";


    /*
        Reset result
    */

    resultBox.classList.remove("show");


    /*
        Reset message
    */

    gameMessage.textContent =
        "Vung đang che...";

    gameMessage.style.color =
        "#777";


    dragHint.classList.remove("show");


    /*
        Thời điểm bắt đầu lượt
    */

    roundStartTime =
        Date.now();


    /*
        Chạy timer
    */

    clearInterval(roundTimer);

    roundTimer =
        setInterval(updateTimer, 100);


    updateTimer();

}


/* =========================================================
   TIMER
========================================================= */

function updateTimer() {

    const elapsed =
        (Date.now() - roundStartTime) / 1000;


    const remaining =
        Math.max(
            0,
            ROUND_TIME - elapsed
        );


    timer.textContent =
        Math.ceil(remaining);


    /*
        Sau 10 giây
        cho phép mở vung
    */

    if (
        !isUnlocked &&
        elapsed >= COVER_TIME
    ) {

        unlockLid();

    }


    /*
        Hết 30 giây
        tạo lượt mới
    */

    if (
        elapsed >= ROUND_TIME
    ) {

        clearInterval(roundTimer);

        startNewRound();

    }

}


/* =========================================================
   UNLOCK LID
========================================================= */

function unlockLid() {

    if (isUnlocked)
        return;


    isUnlocked = true;


    lid.classList.add("unlocked");


    gameMessage.textContent =
        "Bạn có thể kéo vung!";


    gameMessage.style.color =
        "#fff";


    dragHint.classList.add("show");

}


/* =========================================================
   POINTER DOWN
========================================================= */

lid.addEventListener(
    "pointerdown",
    function (event) {

        if (!isUnlocked)
            return;


        isDragging = true;


        pointerStartX =
            event.clientX;


        lidStartX =
            lidCurrentX;


        lid.setPointerCapture(
            event.pointerId
        );


        lid.style.transition =
            "none";


        dragHint.classList.remove(
            "show"
        );

    }
);


/* =========================================================
   POINTER MOVE
========================================================= */

lid.addEventListener(
    "pointermove",
    function (event) {

        if (!isDragging)
            return;


        const difference =
            event.clientX -
            pointerStartX;


        lidCurrentX =
            lidStartX +
            difference;


        /*
            Giới hạn kéo
        */

        const max =
            LID_REMOVE_DISTANCE;


        lidCurrentX =
            Math.max(
                -max,
                Math.min(
                    max,
                    lidCurrentX
                )
            );


        lid.style.transform =
            `translate(-50%, -50%)
             translateX(${lidCurrentX}px)`;

    }
);


/* =========================================================
   POINTER UP
========================================================= */

lid.addEventListener(
    "pointerup",
    finishDrag
);


lid.addEventListener(
    "pointercancel",
    finishDrag
);


function finishDrag(event) {

    if (!isDragging)
        return;


    isDragging = false;


    /*
        Kiểm tra xem đã kéo
        đủ xa chưa
    */

    if (
        Math.abs(lidCurrentX)
        >= LID_REMOVE_DISTANCE
    ) {

        removeLid();

    }

}


/* =========================================================
   REMOVE LID
========================================================= */

function removeLid() {

    lid.classList.add(
        "hidden"
    );


    gameMessage.textContent =
        "Đã mở hết vung!";


    gameMessage.style.color =
        "#fff";


    showResult();

}


/* =========================================================
   SHOW RESULT
========================================================= */

function showResult() {

    const total =
        numbers[0] +
        numbers[1] +
        numbers[2];


    resultScore.textContent =
        total;


    if (total < 10) {

        resultText.textContent =
            "Xỉu";

    }

    else if (total > 10) {

        resultText.textContent =
            "Tài";

    }

    else {

        resultText.textContent =
            "VỪA ĐỦ NGON";

    }


    /*
        Delay nhẹ để animation
        vung biến mất trước
    */

    setTimeout(
        () => {

            resultBox.classList.add(
                "show"
            );

        },
        350
    );

}


/* =========================================================
   START GAME
========================================================= */

startNewRound();