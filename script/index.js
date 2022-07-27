"use strict";

const cursors = document.querySelectorAll(".cursor");
const cursorDiv = document.querySelector(".cursor-div");
const timeContainer = document.querySelector(".time");

setInterval(() => {
	let time = new Date();
	timeContainer.innerHTML = "";
	const html = `<span>${time.toLocaleString("default", {
		timeStyle: "medium",
	})}</span>
    <span>Today is ${time.toLocaleString("default", {
		weekday: "long",
	})}</span>${time.toLocaleString("default", { dateStyle: "long" })} <span>`;

	timeContainer.innerHTML = html;
}, 1000);

document.addEventListener("mousemove", (e) => {
	cursors.forEach((cursor) => {
		cursor.style.top = `${e.clientY}px`;
		cursor.style.left = `${e.clientX}px`;
	});

});

document.querySelectorAll(".cursor-hide").forEach((cursor) => {
	cursor.addEventListener("mouseenter", (e) => {
		cursorDiv.classList.add("hide");
	});
});
document.querySelectorAll(".cursor-hide").forEach((cursor) => {
	cursor.addEventListener("mouseleave", (e) => {
		cursorDiv.classList.remove("hide");
	});
});

localStorage.setItem("x", "Fuck you");
