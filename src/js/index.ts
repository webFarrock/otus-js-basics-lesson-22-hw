import "../css/style.css";
import { createGameOfLife } from "./createGameOfLife";

const gameWrapper1 = document.createElement("div");
const gameWrapper2 = document.createElement("div");

document.body.appendChild(gameWrapper1);
document.body.appendChild(gameWrapper2);

createGameOfLife(3, 3, gameWrapper1);
createGameOfLife(10, 10, gameWrapper2);
