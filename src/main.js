"use strict";
import PopUp from "./popup.js";
import GameBuilder from "./game.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(3)
  .carrotCount(3)
  .bugCount(3)
  .build();

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
