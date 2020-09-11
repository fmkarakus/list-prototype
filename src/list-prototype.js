"use strict";
import { logger } from '../lib/logger.js';

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
    div.className = "warper";
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
  },

  displayTodos: function () {
    //debugger;
    const todosUl = document.getElementById(`${this.state.name}ul`);
    todosUl.innerHTML = "";
    this.state.todos.forEach(function (todo, position) {
      const todoLi = document.createElement("li");
      const todoText = document.createTextNode(todo.text);
      todoLi.id = position;
      todoLi.appendChild(todoText);
      
      const inputEl = document.createElement("input");
      inputEl.type = 'checkbox';
      todoLi.insertBefore(inputEl, todoText);
      

      inputEl.addEventListener(
        "click",
        this.toggleTodos.bind(this, position)
      ); 
      
      if (this.state.todos[position].completed) {
        todoLi.className = 'checkbox';
        inputEl.checked = true;
      } else {
        todoLi.classList.remove('checkbox');
        inputEl.checked = false
      }


      //delete button
      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "X";
      deleteButton.className = "destroy";
      
      todoLi.appendChild(deleteButton);
      deleteButton.addEventListener(
        "click",
        this.deleteTodos.bind(this, position)
      );
      
      todosUl.appendChild(todoLi);
    }, this);
  },

  addTodos: function (event) {
    //debugger;

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
  },
  

  toggleTodos: function (position) {
    debugger
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
  },
  
  deleteTodos: function (position) {
    debugger;

    this.state.todos.splice(position, 1);

    this.displayTodos();

    logger.push({
      action: "Delete Todo",
      stateName: this.state.name,
      state: this.state,
    });
  },
  
};
