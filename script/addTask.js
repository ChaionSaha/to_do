"use strict";
let allTasks = JSON.parse(localStorage.getItem("user-1"));
let counter = JSON.parse(localStorage.getItem("counter"));
if (allTasks === null) {
	allTasks = new Array();
	counter = 0;
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
			newTask.id = counter++;
			allTasks.push(newTask);
			console.log(newTask, allTasks);
			localStorage.setItem("user-1", JSON.stringify(allTasks));
			localStorage.setItem("counter", JSON.stringify(counter));
			location.href = `../index.html`;
		}
	}

	if (e.target.classList.contains("cancel")) {
		location.href = `../index.html`;
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

const editor_main = document.querySelector(".editor-main");
const add = document.querySelector(".add");

editor_main.addEventListener("keypress", (event)=>{
	if(event.target === document.activeElement && event.key === "Enter"){
		if(event.target === title){
			console.log("Hello")
			subHeader.focus();
		}
		else if(event.target === subHeader){
			description.focus();
		}
		else if(event.target === description){
			add.click();
		}
	}
});
