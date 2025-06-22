let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new-btn");
let exitBtn = document.querySelector("#exit-btn");
let msgContainer = document.querySelector(".message-container");
let msg = document.querySelector("#msg");
let aiModeBtn = document.querySelector("#aiMode");
let twoPlayerModeBtn = document.querySelector("#twopMode");
let selectMode = document.querySelector(".modes");
let gameContainer = document.querySelector(".game-container");

let turnO = true;
let aiMode = false;
let gameWon = false;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const newGame = () => {
  turnO = true;
  gameWon = false;
  enableBoxes();
  msgContainer.classList.add("hide");
};

aiModeBtn.addEventListener("click", () => {
  aiMode = true;
  startGame();
});

twoPlayerModeBtn.addEventListener("click", () => {
  aiMode = false;
  startGame();
});

const startGame = () => {
  selectMode.classList.add("hide");
  gameContainer.classList.remove("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "" && !gameWon) {
      playerMove(box);
      if (aiMode && !turnO && !gameWon) {
        setTimeout(aiMove, 500);
      }
    }
  });
});

const playerMove = (box) => {
  box.innerText = turnO ? "O" : "X";
  box.disabled = true;
  checkWinner();
  turnO = !turnO;
};

const aiMove = () => {
  let availableBoxes = Array.from(boxes).filter(box => !box.disabled);

  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (boxes[a].innerText === "X" && boxes[b].innerText === "X" && boxes[c].innerText === "") {
      return playAI(c);
    }
    if (boxes[a].innerText === "X" && boxes[b].innerText === "" && boxes[c].innerText === "X") {
      return playAI(b);
    }
    if (boxes[a].innerText === "" && boxes[b].innerText === "X" && boxes[c].innerText === "X") {
      return playAI(a);
    }
  }

  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (boxes[a].innerText === "O" && boxes[b].innerText === "O" && boxes[c].innerText === "") {
      return playAI(c);
    }
    if (boxes[a].innerText === "O" && boxes[b].innerText === "" && boxes[c].innerText === "O") {
      return playAI(b);
    }
    if (boxes[a].innerText === "" && boxes[b].innerText === "O" && boxes[c].innerText === "O") {
      return playAI(a);
    }
  }

  let rand = Math.floor(Math.random() * availableBoxes.length);
  playAI(Array.from(boxes).indexOf(availableBoxes[rand]));
};

const playAI = (index) => {
  boxes[index].innerText = "X";
  boxes[index].disabled = true;
  checkWinner();
  turnO = true;
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (boxes[a].innerText !== "" && boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText) {
      showWinner(boxes[a].innerText);
      gameWon = true;
      return;
    }
  }

  if (Array.from(boxes).every(box => box.innerText !== "")) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    gameWon = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
};

exitBtn.addEventListener("click", () => {
  newGame();
  msgContainer.classList.add("hide");
  selectMode.classList.remove("hide");
  gameContainer.classList.add("hide");
});

newGameBtn.addEventListener("click", newGame);  