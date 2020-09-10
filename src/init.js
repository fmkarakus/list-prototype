"use strict";

import { createNewListHandler } from "./handlers/create-new-list.js";
debugger;
document
  .getElementById("list-name-input")
  .addEventListener("keyup", createNewListHandler);
