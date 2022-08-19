"use strict";

const tasksDiv = document.querySelector(".tasks");
const mainBody = document.querySelector(".main-body");
let counter = 0;
////////////////////////////////////////////////
/// Task work
let allTasks = JSON.parse(localStorage.getItem("user-1"));

const updateUI = function () {
	tasksDiv.innerHTML = "";
	if (allTasks === null) return;
	allTasks.map((task, i) => {
		if (task.isDone === true) return;
		counter++;
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
	if (e.target.classList.contains("done")) {
		const targetID = e.target.parentElement.parentElement.dataset.id;
		allTasks[targetID].isDone = true;
		localStorage.setItem("user-1", JSON.stringify(allTasks));
		updateUI();
	}
	if (e.target.classList.contains("edit")) {
		console.log("edit button clicked");
		const targetID = e.target.parentElement.parentElement.dataset.id;
		window.location.href = `../pages/editTask.html?q=${targetID}`;
	}
});
