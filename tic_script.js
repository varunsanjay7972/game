let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newgame = document.querySelector(".newgame");

let turnO = true; //playerX,playerO
const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkwinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes)
        box.disabled = true;
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const checkwinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3 && pos3 === pos1) {
                let urlParams = new URLSearchParams(window.location.search);
                let playerX = urlParams.get('playerX');
                let playerO = urlParams.get('playerO');
                let winnerName = pos1 === 'X' ? playerX : playerO;
                callAlert(`Congratulations ${winnerName} wins!`);
                disableBoxes();
            }
        }
    }
};



const resetGame = () => {

    turnO = true;
    enableBoxes();
};

resetbtn.addEventListener("click", resetGame);
newgame.addEventListener("click", () => {
    window.location.href = "index.html";
})

function startGame() {
    var playerX = document.getElementById("playerX").value;
    var playerO = document.getElementById("playerO").value;
    // Redirect to tiktoc.html
    window.location.href = "tiktoc.html?playerX=" + playerX + "&playerO=" + playerO;
}

function callAlert(msg) {
    blurGameContainer(); // Blur the background
    alert(msg, 4000); // Show the alert

}

window.alert = function(message, timeout = null) {
    const alert = document.createElement('div');
    alert.classList.add('tik_style');
    alert.setAttribute('style',
        `
        margin: auto;
        position: absolute;
       right: 28rem;
       top: 2rem;
       width: 26rem;
       height: 16rem;
       text-align: center;
       padding-top: 5rem;
       background-color: #720b8c;
       margin-top: 10%;
       border-radius: 0.5rem;
       
        `
    );

    alert.innerHTML = `<h1>${message}</h1>`;

    if (timeout != null) {
        setTimeout(() => {
            alert.remove();
            unblurGameContainer();
        }, Number(timeout))
    }
    document.body.appendChild(alert);
    resetGame();

}

function blurGameContainer() {
    document.getElementById('gameContainer').classList.add('blur');
}

function unblurGameContainer() {
    document.getElementById('gameContainer').classList.remove('blur');
}