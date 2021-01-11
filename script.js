$(document).ready(function () {
  var playerSymbol;
  var playerSymbolImg;
  var aiSymbol;
  var aiSymbolImg;
  var victory = 0;
  var next = "ai";
  var temp = [];
  var board = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  ]; //initial board is emptys

  var win = [
    //win conditions
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  var xImg =
    '<img class="full" src="./x.png">';



  var oImg =
    '<img class="full" src="./o.png">';


  $("#about").tooltip();

  $("#x").on("click", function () {
    playerSymbol = "x";
    aiSymbol = "o";
    playerSymbolImg = xImg;
    aiSymbolImg = oImg;
    $("#choice").html(
      '<h2 id="choice">You are playing with <img id="x" src="./x.png">'
    );
    $("#o").remove();
    $("#6").html(aiSymbolImg);
    $("#6").addClass("full");
    board.splice(6, 1, aiSymbol);
    next = "player";
  });

  $("#o").on("click", function () {
    playerSymbol = "o";
    aiSymbol = "x";
    playerSymbolImg = oImg;
    aiSymbolImg = xImg;
    $("#choice").html(
      '<h2 id="choice">You are playing with <img id="o" src="./o.png">'
    );
    $("#x").remove();
    $("#6").html(aiSymbolImg);
    $("#6").addClass("full");
    board.splice(6, 1, aiSymbol);
    next = "player";
  });

  function countPlayer(arr) {
    return arr.reduce(function (n, val) {
      return n + (val == playerSymbol);
    }, 0);
  }

  function countUnd(arr) {
    return arr.reduce(function (n, val) {
      return n + (val === undefined);
    }, 0);
  }

  function countAi(arr) {
    return arr.reduce(function (n, val) {
      return n + (val == aiSymbol);
    }, 0);
  }

  function findUnd(val) {
    return val === undefined;
  }

  function newGame() {
    console.log(board);
    if (victory == 1) {
      board = [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ];
      $("#choice").on("click", function () {
        $("#choice").html("You are playing with " + playerSymbolImg);
        for (var i = 0; i <= 8; i++) {
          $("#" + i).html(
            '<img src="./placeholder.png">'
          );
          $("#" + i).removeClass("full");
        }
        $("#6").html(aiSymbolImg);
        $("#6").addClass("full");
        board.splice(6, 1, aiSymbol);
        next = "player";
        victory = 0;
        temp = [];
      });
    }
  }

  function checkWin() {
    win.forEach(function (arr) {
      var checkWinX = arr.every(function (val) {
        return board[val] == "x";
      });

      var checkWinO = arr.every(function (val) {
        return board[val] == "o";
      });

      if (checkWinX === true) {
        if (aiSymbol == "x") {
          $("#choice").html("You lose! Click here to restart.");
          victory = 1;
          newGame();
        } else if (playerSymbol == "x") {
          $("#choice").html("You win! Click here to restart.");
          victory = 1;
          newGame();
        }
      } else if (checkWinO === true) {
        if (aiSymbol == "o") {
          $("#choice").html("You lose! Click here to restart.");
          victory = 1;
          newGame();
        } else if (playerSymbol == "o") {
          $("#choice").html("You win! Click here to restart.");
          victory = 1;
          newGame();
        }
      }
    });

    var tie = board.every(function (val) {
      return val !== undefined;
    });

    if (tie === true && victory === 0) {
      $("#choice").html("It's a tie. Click here to restart.");
      victory = 1;
      next = "ai";
      newGame();
    }
  }

  function turn(event) {
    if (victory === 0) {
      if (
        playerSymbol !== undefined &&
        $("#" + event.data.n).hasClass("full") === false &&
        next == "player"
      ) {
        $("#" + event.data.n).html(playerSymbolImg);
        $("#" + event.data.n).addClass("full");
        board.splice(event.data.n, 1, playerSymbol);
        temp = [];
        checkWin();
        next = "ai";
      } else if ($(event.data.id).hasClass("full") === true) {
        alert("You cannot choose this position.");
      } else {
        alert("Choose a symbol first!");
      }

      //win or don't let player win
      if (next == "ai") {
        win.forEach(function (arr) {
          if (next == "ai") {
            var temp = [];
            var undIndex;
            arr.forEach(function (val, index, array) {
              if (board[val] === undefined) {
                undIndex = val;
              }
              temp.push(board[val]);
            });
            if (countAi(temp) == 2 && countUnd(temp) == 1 && victory != 1) {
              board.splice(undIndex, 1, aiSymbol);
              $("#" + undIndex).html(aiSymbolImg);
              $("#" + undIndex).addClass("full");
              next = "player";
              temp = [];
              checkWin();
            } else if (countPlayer(temp) == 2 && countUnd(temp) == 1) {
              board.splice(undIndex, 1, aiSymbol);
              $("#" + undIndex).html(aiSymbolImg);
              $("#" + undIndex).addClass("full");
              next = "player";
              temp = [];
              checkWin();
            }
          }
        });
      }

      //fill first avaiable space if ai can't win or player won't win next turn
      if (next == "ai") {
        var undIndex = board.findIndex(function (val) {
          return val === undefined;
        });

        board.splice(undIndex, 1, aiSymbol);
        $("#" + undIndex).html(aiSymbolImg);
        $("#" + undIndex).addClass("full");
        next = "player";
        checkWin();
      }
    }
  }

  $("#0").on("click", {
    id: "#0",
    n: 0
  }, turn);
  $("#1").on("click", {
    id: "#1",
    n: 1
  }, turn);
  $("#2").on("click", {
    id: "#2",
    n: 2
  }, turn);
  $("#3").on("click", {
    id: "#3",
    n: 3
  }, turn);
  $("#4").on("click", {
    id: "#4",
    n: 4
  }, turn);
  $("#5").on("click", {
    id: "#5",
    n: 5
  }, turn);
  $("#6").on("click", {
    id: "#6",
    n: 6
  }, turn);
  $("#7").on("click", {
    id: "#7",
    n: 7
  }, turn);
  $("#8").on("click", {
    id: "#8",
    n: 8
  }, turn);
});