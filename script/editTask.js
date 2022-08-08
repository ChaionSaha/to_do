"use strict";

const queryString = location.search;
const urlParam = new URLSearchParams(queryString);
const id = urlParam.get("q");

const tasks = JSON.parse(localStorage.getItem("user-1"));
console.log(tasks);

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
});
