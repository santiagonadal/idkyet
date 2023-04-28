class Connect4Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        whoseTurn: 1,
        gameOver: false,
        statusText: "Your Turn!",
        statusColor: { color: 'yellow' },
        slotsArray: new Array(42).fill(0),
        difficulty: "Medium",
        soundfx: "On",
        playerScore: 0,
        computerScore: 0 };
  
      this.handleClick = this.handleClick.bind(this);
      this.buttonClick = this.buttonClick.bind(this);
      this.dropCounter = this.dropCounter.bind(this);
      this.aiTurn = this.aiTurn.bind(this);
      this.playSound = this.playSound.bind(this);
      this.resetGame = this.resetGame.bind(this);
    }
  
    // Once a change has been made to the React Components State, check the status of the game and take necessary actions..
    componentDidUpdate() {
      // Check for winners and change state of items..
      if (this.state.gameOver == false) {
        let winner = checkForWinners(this.state.slotsArray);
        if (winner == 1) {
          this.setState({ gameOver: true, statusText: "You Win!", playerScore: this.state.playerScore + 1 });
          this.playSound('youWinSnd');
          return null;
        } else if (winner == 2) {
          this.setState({ gameOver: true, statusText: "Computer Wins!", computerScore: this.state.computerScore + 1 });
          this.playSound('gameOverSnd');
          return null;
        }
  
        // Check for a draw / full board..
        if (checkFullBoard(this.state.slotsArray)) {
          this.setState({ gameOver: true, statusText: "No More Room. Game Over!" });
          this.playSound('fullBoardSnd');
          return null;
        }
  
        // If it's the computer's turn then wait 300ms before deciding where to go (instant play is not as fun!)
        if (this.state.whoseTurn == 2) {
          setTimeout(this.aiTurn, 300);
          return null;
        };
      }
    }
  
    // Function that handles resetting the game
    resetGame(whoIsFirst) {
      if (whoIsFirst <= 50) {
        this.setState({
          slotsArray: new Array(42).fill(0),
          gameOver: false,
          whoseTurn: 1,
          statusText: "Your Turn!",
          statusColor: { color: 'yellow' },
          playerScore: 0,
          computerScore: 0 });
  
      } else {
        this.setState({
          slotsArray: new Array(42).fill(0),
          gameOver: false,
          whoseTurn: 2,
          statusText: "Computer's Turn!",
          statusColor: { color: 'red' },
          playerScore: 0,
          computerScore: 0 });
  
      }
    }
  
    // Function to play each required Audio tag after checking if Sound FX are turned on
    playSound(soundID) {
      if (this.state.soundfx != "On") {
        return null;
      };
      let sound = document.getElementById(soundID);
      sound.currentTime = 0;
      sound.play();
    }
  
    // Handle the user clicking a button..
    buttonClick(e) {
      this.playSound('dropCounterSnd');
      let whoIsFirst = Math.floor(Math.random() * 100) + 1;
      switch (e.target.id) {
        case "difficultyButton":
          if (this.state.difficulty == "Hard") {
            this.setState({ difficulty: "Easy" });
          } else if (this.state.difficulty == "Easy") {
            this.setState({ difficulty: "Medium" });
          } else if (this.state.difficulty == "Medium") {
            this.setState({ difficulty: "Hard" });
          }
          this.playSound('startGameSnd');
          this.resetGame(whoIsFirst);
          break;
  
        case "soundButton":
          if (this.state.soundfx == "On") {
            this.setState({ soundfx: "Off" });
          } else {
            this.setState({ soundfx: "On" });
          }
          break;
  
        case "newGameButton":
          if (!checkEmptyBoard(this.state.slotsArray) && this.state.gameOver == false) {
            this.setState({ computerScore: this.state.computerScore + 1 });
          }
          this.playSound('startGameSnd');
          if (whoIsFirst <= 50) {
            this.setState({ slotsArray: new Array(42).fill(0), gameOver: false, whoseTurn: 1, statusText: "Your Turn!", statusColor: { color: 'yellow' } });
          } else {
            this.setState({ slotsArray: new Array(42).fill(0), gameOver: false, whoseTurn: 2, statusText: "Computer's Turn!", statusColor: { color: 'red' } });
          }
          break;
  
        case "resetScoresButton":
          this.playSound('startGameSnd');
          this.resetGame(whoIsFirst);
          break;
          
          case "exit-game":
            window.location.href = "games.html";}

  
    }
  
    // Drop a counter into a column if possible..
    dropCounter(col, player) {
      let newSlotsArray = addCounter(this.state.slotsArray, col, player);
      if (newSlotsArray) {
        if (player == 2) {
          this.setState({ slotsArray: newSlotsArray, whoseTurn: 1, statusText: "Your Turn!", statusColor: { color: 'yellow' } });
        } else {
          this.setState({ slotsArray: newSlotsArray, whoseTurn: 2, statusText: "Computer's Turn!", statusColor: { color: 'red' } });
        }
      }
    }
  
    // Handle the user clicking on a slot..
    handleClick(e) {
      if (this.state.whoseTurn != 1) return null;
      if (this.state.gameOver) return null;
      this.playSound('dropCounterSnd');
      let holeClicked = e.target.id.substring(4);
      let colClicked = holeClicked % 7;
      this.dropCounter(colClicked, 1);
    }
  
    // The computer takes it's turn..
    aiTurn() {
      if (this.state.whoseTurn != 2) return null;
      if (this.state.gameOver) return null;
      this.playSound('dropCounterSnd');
      let col = decide(this.state.slotsArray, this.state.difficulty);
      this.dropCounter(col, 2);
    }
  
    // Render the component to the DOM
    render() {
      const renderholes = this.state.slotsArray.map((x, i) => {
        let idname = 'hole' + i;
        let clname = x == 0 ? 'hole_empty' : x == 1 ? 'hole_yellow' : 'hole_red';
        return /*#__PURE__*/React.createElement("div", { className: clname, id: idname, onClick: this.handleClick });
      });
      return /*#__PURE__*/(
        React.createElement("div", { id: "threepanel" }, /*#__PURE__*/
        React.createElement("div", { id: "leftpanel" }, /*#__PURE__*/
        React.createElement("div", { id: "leftpanelTop" }, /*#__PURE__*/
        React.createElement("p", { id: "playerLabel" }, "Player"), /*#__PURE__*/
        React.createElement("p", { id: "playerScore" }, this.state.playerScore)), /*#__PURE__*/
  
        React.createElement("div", { id: "leftpanelMiddle" }, /*#__PURE__*/
        React.createElement("p", { id: "difficultyLabel" }, "Difficulty"), /*#__PURE__*/
        React.createElement("button", { id: "difficultyButton", onClick: this.buttonClick }, this.state.difficulty)), /*#__PURE__*/
  
        React.createElement("div", { id: "leftpanelBottom" }, /*#__PURE__*/
        React.createElement("p", { id: "soundLabel" }, "Sound FX"), /*#__PURE__*/
        React.createElement("button", { id: "soundButton", onClick: this.buttonClick }, this.state.soundfx))), /*#__PURE__*/
  
  
        React.createElement("div", { id: "outerbox" }, /*#__PURE__*/
        React.createElement("h1", null, "Connect 4"), /*#__PURE__*/
        React.createElement("div", { id: "gameboard" },
        renderholes), /*#__PURE__*/
  
        React.createElement("p", { style: this.state.statusColor }, this.state.statusText)), /*#__PURE__*/
  
        React.createElement("div", { id: "rightpanel" }, /*#__PURE__*/
        React.createElement("div", { id: "rightpanelTop" }, /*#__PURE__*/
        React.createElement("p", { id: "computerLabel" }, "Computer"), /*#__PURE__*/
        React.createElement("p", { id: "computerScore" }, this.state.computerScore)), /*#__PURE__*/
  
        React.createElement("div", { id: "rightpanelBottom" }, /*#__PURE__*/
        React.createElement("p", { id: "gameLabel" }, "Game"), /*#__PURE__*/
        React.createElement("button", { id: "newGameButton", onClick: this.buttonClick }, "New Game"), /*#__PURE__*/
        React.createElement("button", { id: "resetScoresButton", onClick: this.buttonClick }, "Reset Scores"),
        React.createElement("button", { id: "exit-game", onClick: this.buttonClick}, "Exit Game")
        ))));
  
  
  
  
    }}
  ;
  
  // Function that decides where the computer should take it's turn..
  function decide(arr, difficulty) {
    let copyarr = arr.slice();
    let freecols = getFreeCols(copyarr);
    let sum = 0;
    let maxsum = -10000;
    let diff = difficulty == "Easy" ? 60 : difficulty == "Medium" ? 75 : 100;
    let maxindex = freecols.indexOf(true);
  
    if (Math.floor(Math.random() * 100) + 1 <= diff) {
      for (let i = 0; i <= 6; i++) {
        if (freecols[i]) {
          let newarr = addCounter(copyarr, i, 2);
          if (newarr) {
            sum = calcGames(newarr, 2, 1);
            //console.log("Slot " + i + " Chance: " + sum);
          };
          if (sum > maxsum) {
            maxsum = sum;
            maxindex = i;
          }
        }
      }
      //console.log("Choice " + maxindex);
      //console.log("------------------------");
      return maxindex;
    }
    return maxindex;
  }
  
  // Recursive function that plays all possible outcomes of the game a number of turns ahead to find out what move is best..
  function calcGames(arr, player, depth) {
    depth++;
    if (depth > 7) return 0;
    if (player == 1) {
      player = 2;
    } else {
      player = 1;
    }
    let copyarr = arr.slice();
    let freecols = getFreeCols(copyarr);
    if (checkFullBoard(copyarr)) return 0;
    let winner = checkForWinners(copyarr);
    if (winner == 2 && depth == 2) return 9999;
    if (winner == 1 && depth == 3) return -9999;
    if (winner == 1) return -1;
    if (winner == 2) return 1;
    let sums = 0;
    for (let i = 0; i <= 6; i++) {
      if (freecols[i]) {
        let newarr = addCounter(copyarr, i, player);
        sums += calcGames(newarr, player, depth);
      }
    }
    return sums;
  }
  
  // Add a counter to a slot array if possible
  function addCounter(arr, col, player) {
    let newArray = arr.slice();
    for (let i = newArray.length; i >= 0; i--) {
      if (i % 7 == col && newArray[i] == 0) {
        newArray[i] = player;
        return newArray;
      }
    }
    return null;
  }
  
  // Return an array of Boolean values showing which columns are not full
  function getFreeCols(arr) {
    let slotArray = arr.slice();
    let cols = [];
    for (let i = 0; i <= 6; i++) {
      cols[i] = slotArray[i] == 0;
    }
    return cols;
  }
  
  // Return true if all slots are full
  function checkFullBoard(arr) {
    if (arr.indexOf(0) == -1) {
      return true;
    }
    return false;
  }
  
  // Return true if all slots are empty
  function checkEmptyBoard(arr) {
    if (arr.indexOf(1) == -1 && arr.indexOf(2) == -1) {
      return true;
    }
    return false;
  }
  
  // Check if there are 4 of the same counters in a row..
  function checkForWinners(arr) {
    // Horizontal Checks
    for (let i = 0; i <= 35; i = i + 7) {
      for (let j = 0; j <= 3; j++) {
        let winner = check4inRow(arr, i + j, i + j + 1, i + j + 2, i + j + 3);
        if (winner[0]) return winner[1];
      }
    }
    // Vertical Checks
    for (let i = 0; i <= 6; i++) {
      for (let j = 0; j <= 14; j = j + 7) {
        let winner = check4inRow(arr, i + j, i + j + 7, i + j + 14, i + j + 21);
        if (winner[0]) return winner[1];
      }
    }
    // Diagonal Checks TL to BR
    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j <= 14; j = j + 7) {
        let winner = check4inRow(arr, i + j, i + j + 8, i + j + 16, i + j + 24);
        if (winner[0]) return winner[1];
      }
    }
    // Diagonal Checks TR to BL
    for (let i = 3; i <= 6; i++) {
      for (let j = 0; j <= 14; j = j + 7) {
        let winner = check4inRow(arr, i + j, i + j + 6, i + j + 12, i + j + 18);
        if (winner[0]) return winner[1];
      }
    }
    return 0;
  }
  
  // Check if slot references passed (a, b, c & d) contain the same counters
  function check4inRow(arr, a, b, c, d) {
    if (arr[a] == 1 && arr[b] == 1 && arr[c] == 1 && arr[d] == 1) {
      return [true, 1];
    } else if (arr[a] == 2 && arr[b] == 2 && arr[c] == 2 && arr[d] == 2) {
      return [true, 2];
    } else {
      return [false, 0];
    }
  }
  
  ReactDOM.render( /*#__PURE__*/React.createElement(Connect4Game, null), document.getElementById('reactFrame'));