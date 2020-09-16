"use strict";

import { list } from "../list-class.js";
import { logger } from "../../lib/logger.js";

export const createNewListHandler = (event) => {
  debugger;
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode !== 13) {
    return;
  }
  if (event.target.value === "") {
    alert("Please Enter A Todo list!"); // Optional (Gelila)
    return;
  }
  document.body.style = "backdrop-filter: blur(2px) ;";

  const newList = new list(event.target.value);
  const renderedNewList = newList.render();

  document.getElementById("lists").appendChild(renderedNewList);

  logger.push({
    action: "create new list",
    event,
    newList,
    renderedNewList,
  });
  event.target.value = "";
};
