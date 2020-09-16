"use strict";

//import { logger } from "../../lib/logger.js";

export class list {
  state = {
    name: "",
    todos: [],
  };

  constructor(name) {
    this.state.name = name;
  }

  render() {
    debugger;
    const div = document.createElement("div");

    div.className = "warper";
    div.id = "warpper";
    const button = document.createElement("button");
    button.id = "remove";
    button.innerHTML = '<i class="fa fa-close"></i>';
    button.style.float = "right";
    button.addEventListener("click", function remove() {
      this.parentNode.remove();
    });
    div.appendChild(button);

    //Toggle All button
    debugger;
    const buttonAll = document.createElement("button");
    buttonAll.innerHTML =
      '<i class="fa fa-angle-double-down" style="font-size:15px"></i>';
    buttonAll.style.float = "right";
    div.appendChild(buttonAll);

    buttonAll.addEventListener("click", this.toggleAll.bind(this));
    const divh3 = document.createElement("h3");
    divh3.innerHTML = this.state.name;
    const buttonEl = document.createElement("button");
    buttonEl.innerHTML = "Add List";
    buttonEl.id = "add";
    buttonEl.addEventListener("click", this.addTodos.bind(this));
    const todosIN = document.createElement("input");
    todosIN.type = "text";
    todosIN.placeholder = "what is next?";
    todosIN.id = `${this.state.name}newToDo`;
    const todosUl = document.createElement("ul");
    todosUl.id = `${this.state.name}ul`;

    div.appendChild(divh3);
    div.appendChild(todosIN);
    div.appendChild(buttonEl);
    div.appendChild(todosUl);
    return div;
  }

  displayTodos() {
    debugger;
    var todosUl = document.getElementById(`${this.state.name}ul`);
    todosUl.innerHTML = "";
    this.state.todos.forEach(function (todo, position) {
      const todoLi = document.createElement("li");
      const todoText = document.createTextNode(todo.text);
      todoLi.id = position;
      todoLi.appendChild(todoText);

      const inputEl = document.createElement("input");
      inputEl.type = "checkbox";
      todoLi.insertBefore(inputEl, todoText);

      inputEl.addEventListener("click", this.toggleTodos.bind(this, position));

      if (this.state.todos[position].completed) {
        todoLi.className = "checkbox";
        inputEl.checked = true;
      } else {
        todoLi.classList.remove("checkbox");
        inputEl.checked = false;
      }

      //delete button

      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
      deleteButton.className = "btn";
      todoLi.appendChild(deleteButton);
      deleteButton.addEventListener(
        "click",
        this.deleteTodos.bind(this, position)
      );

      todosUl.appendChild(todoLi);
    }, this);
  }

  addTodos(event) {
    debugger;

    const uniqueInputId = `${this.state.name}newToDo`;

    let newToDo = document.getElementById(uniqueInputId).value;

    if (newToDo === "") {
      alert("Please write a Todo!");
      return;
    }
    this.state.todos.push({
      text: newToDo,
      completed: false,
    });

    this.displayTodos();
    document.getElementById(uniqueInputId).value = "";
    logger.push({
      action: "Add Todo",
      stateName: this.state.name,
      state: this.state,
    });
  }

  toggleTodos(position) {
    debugger;
    if (!this.state.todos[position].completed) {
      this.state.todos[position].completed = true;
      this.displayTodos();
    } else {
      this.state.todos[position].completed = false;
      this.displayTodos();
    }
    logger.push({
      action: "Check input",
      stateName: this.state.todos[position],
      state: this.state.todos[position].completed,
    });
  }

  toggleAll() {
    debugger;
    const listObj = this.state.todos;
    for (let i = 0; i < listObj.length; i++) {
      listObj[i].completed = true;
    }
    this.displayTodos();
  }

  deleteTodos(position) {
    debugger;

    this.state.todos.splice(position, 1);

    this.displayTodos();

    logger.push({
      action: "Delete Todo",
      stateName: this.state.name,
      state: this.state,
    });
  }
}
