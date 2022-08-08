"use strict";
let allTasks = JSON.parse(localStorage.getItem("user-1"));
if (allTasks === null) {
	allTasks = new Array();
}

const newTask = {
	isDone: false,
};
let title = document.querySelector("#title");
let subHeader = document.querySelector("#sub-header");
let description = document.querySelector("#description");
document.addEventListener("click", (e) => {
	if (e.target.classList.contains("add")) {
		e.preventDefault();
		if (title.value === "") {
			title.placeholder = `Title cannot be empty`;
		} else {
			newTask.title = title.value;
			newTask.subHeader = subHeader.value;
			newTask.description = description.value;
			if (allTasks === null) {
				newTask.id = 0;
			} else {
				newTask.id = allTasks.length;
			}
			allTasks.push(newTask);
			console.log(newTask, allTasks);
			localStorage.setItem("user-1", JSON.stringify(allTasks));
			location.href = `../index.html`;
		}
	}

	if (e.target.classList.contains("cancel")) {
		location.href = `../index.html`;
	}
});
