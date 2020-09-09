'use strict';

/* List Prototype

  This object will contain all the methods for your many lists
  in your app you will use Object.create(listPrototype) to create many lists
  it will include all the functions you need for a list:
    logic
    views
    handlers

  You will need to use binding (or arrow functions) to connect handlers to views

*/

export const listPrototype = {
  printState: function () {
    console.log(this.state.name);
  },
  render: function () {
    const div = document.createElement("div");
    div.id = "warpper";
    const divh3 = document.createElement("h3");
    divh3.innerHTML = this.state.name;
    const buttonEl = document.createElement("button");
    buttonEl.innerHTML = "Add List";
    buttonEl.id = "add";
    buttonEl.addEventListener("click", this.printState.bind(this));
    const todosIN = document.createElement("input");
    todosIN.type = "text";
    todosIN.placeholder = "what is next?";
    const todosUl = document.createElement("ul");

    div.appendChild(todosUl);
    div.appendChild(divh3);
    div.appendChild(todosIN);
    div.appendChild(buttonEl);
    return div;
  }
};
