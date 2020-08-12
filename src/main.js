"use strict";
import PopUp from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(3)
  .carrotCount(3)
  .bugCount(3)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.win:
      message = "YOU WON🤗";
      sound.playGameWin();
      break;
    case Reason.lose:
      message = "YOU LOST😥";
      sound.playBug();
      break;
    case Reason.cancel:
      message = "REPLAY❓";
      sound.playAlert();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickLister(() => {
  game.start();
});
