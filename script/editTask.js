"use strict";

const queryString = location.search;
const urlParam = new URLSearchParams(queryString);
const targetID = urlParam.get("q");

const tasks = JSON.parse(localStorage.getItem("user-1"));

let id = tasks.findIndex((t) => {
	return t.id == targetID;
});

let title = document.querySelector("#title");
let subHeader = document.querySelector("#sub-header");
let description = document.querySelector("#description");

title.value = `${tasks[id].title}`;
subHeader.value = `${tasks[id].subHeader}`;
description.value = `${tasks[id].description}`;

document.addEventListener("click", (e) => {
	if (e.target.classList.contains("submit")) {
		tasks[id].title = title.value;
		tasks[id].subHeader = subHeader.value;
		tasks[id].description = description.value;
		console.log(tasks[id], tasks);
		localStorage.setItem("user-1", JSON.stringify(tasks));
		location.href = "../index.html";
	}

	if (e.target.classList.contains("cancel")) {
		location.href = "../index.html";
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
const add = document.querySelector(".submit");

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
