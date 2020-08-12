"use strict";
import PopUp from "./popup.js";
import Game from "./game.js";

const gameFinishBanner = new PopUp();
const game = new Game(3, 2, 2);
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case "win":
      message = "YOU WON🤗";
      break;
    case "lose":
      message = "YOU LOST😥";
      break;
    case "cancel":
      message = "REPLAY❓";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickLister(() => {
  game.start();
});
