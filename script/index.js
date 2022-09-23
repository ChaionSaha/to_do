"use strict";

const tasksDiv = document.querySelector(".tasks");
// console.log(tasksDiv)
const mainBody = document.querySelector(".main-body");

 ////////////////////////////////////////////////
/// Task work
let allTasks = JSON.parse(localStorage.getItem("user-1"));

const updateUI = function () {
  tasksDiv.innerHTML = "";
  if (allTasks === null) return;
  allTasks.map((task, i) => {
    if (task.isDone === true) return;
    const divCreate = document.createElement("div");
    divCreate.classList.add("task");
    divCreate.dataset.id = task.id;
    divCreate.innerHTML = "";
    const html = `
					<div class="header">
						<h1 class="Title">${task.title}</h1>
						<svg class="done">
							<use
								xlink:href="./img/icomoon/symbol-defs.svg#icon-checked"
							></use>
						</svg>
					</div>
					<h2 class="sub-header">${task.subHeader}</h2>
					<p class="Description">
						${task.description}
					</p>
					<div class="footer">
						<svg class="edit">
							<use
								xlink:href="./img/icomoon/symbol-defs.svg#icon-edit"
							></use>
						</svg>
						<svg class="delete">
							<use
								xlink:href="./img/icomoon/symbol-defs.svg#icon-trashcan"
							></use>
						</svg>
					</div>`;
    divCreate.innerHTML = html;
    tasksDiv.appendChild(divCreate);
  });
};

updateUI();

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("done")) {
    const targetID = e.target.parentElement.parentElement.dataset.id;
    const targetIndex = allTasks.findIndex((t) => {
      return t.id == targetID;
    });
    allTasks[targetIndex].isDone = true;
    localStorage.setItem("user-1", JSON.stringify(allTasks));
    updateUI();
  }
  if (e.target.classList.contains("edit")) {
    const targetID = e.target.parentElement.parentElement.dataset.id;
    window.location.href = `./pages/editTask.html?q=${targetID}`;
  }
  if (e.target.classList.contains("delete")) {
    const targetID = e.target.parentElement.parentElement.dataset.id;
    const targetIndex = allTasks.findIndex((t) => {
      return t.id == targetID;
    });
    console.log(targetIndex);
    allTasks.splice(targetIndex, 1);
    localStorage.setItem("user-1", JSON.stringify(allTasks));
    updateUI();
  }
  if (e.target.classList.contains("icon")) {
    const addDiv = document.querySelector(".add_menu");
    if(addDiv.classList.contains("add_forward")){
      addDiv.classList.remove("add_forward");
      addDiv.classList.add("add_backward");
    }else{
      addDiv.classList.remove("add_backward");
      addDiv.classList.add("add_forward");
    }
  }
});

import * as equalCardsModule from "./equalCards.js";

equalCardsModule.initial();

window.addEventListener("resize", (e)=>{
	e.preventDefault();
  let w = (window.innerWidth > 0)? window.innerWidth:screen.width;
  if(w>700){
    equalCardsModule.cardsWidthEqual();
  } 
})

