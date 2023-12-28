const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign;
  };

  return { getSign };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setField = (index, sign) => {
    if (index > board.length) return;
    board[index] = sign;
  };

  const getField = (index) => {
    if (index > board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { setField, getField, reset, board };
})();

const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 0;
  let isOver = false;

  const playRound = (fieldIndex) => {
    gameBoard.setField(fieldIndex, getCurrentPlayerSign());
    if (round === 9) {
      console.log("Draw");
      isOver = true;
      return;
    }
    round++;
  };

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
  };

  const checkWinner = () => {
    const winstates = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winstates.length; i++) {
      if (
        gameBoard.board[winstates[i][0]] == gameBoard.board[winstates[i][1]] &&
        gameBoard.board[winstates[i][1]] == gameBoard.board[winstates[i][2]] &&
        gameBoard.board[winstates[i][0]] == getCurrentPlayerSign()
      ) {
        isOver = true;
        document.getElementById("message").textContent =
          "The player " + getCurrentPlayerSign() + " wins";
        document.getElementById("myModal").style.display = "block";
      }
    }
  };

  const getIsOver = () => {
    return isOver;
  };

  const reset = () => {
    round = 1;
    isOver = false;
  };

  return { playRound, getIsOver, reset, getCurrentPlayerSign, checkWinner };
})();

function play() {
  document.getElementById("myModal").style.display = "none";
  gameController.reset();
  gameBoard.reset();
  //for all div with class boardtile remove all children
  let squares = document.querySelectorAll(".boardtile");
  squares.forEach((square) => {
    if (square.hasChildNodes()) {
      square.removeChild(square.firstChild);
    }
  });
}

const displayController = (() => {
  const setboard = () => {
    for (let i = 0; i < 9; i++) {
      let boardtile = document.createElement("div");
      boardtile.className = "boardtile";
      boardtile.id = "d" + i;
      board.appendChild(boardtile);
    }

    let tiles = document.querySelectorAll(".boardtile");
    tiles.forEach((tile) =>
      tile.addEventListener("click", (e) => {
        if (!tile.hasChildNodes() && !gameController.getIsOver()) {
          gameController.playRound(tile.id);
          let pic = document.createElement("img");
          gameBoard.setField(
            parseInt(tile.id[1]),
            gameController.getCurrentPlayerSign()
          );

          if (gameController.getCurrentPlayerSign() == "X") {
            pic.src = "./x_color.png";
          } else {
            pic.src = "./o_color.png";
          }
          tile.appendChild(pic);
          gameController.checkWinner();
        }
      })
    );
  };

  return { setboard };
})();

displayController.setboard();
let restart = document.querySelector("#restart");
let restart_pop = document.querySelector("#restart_pop");
restart.addEventListener("click", play);
restart_pop.addEventListener("click", play);
