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

////////////////////////////////////////////////////////////
// Location tracking

const getLocation = function () {
	let temp;
	function success(pos) {
		const weatherURL = generateWeatherURL(pos.coords);
		fetch(weatherURL)
			.then((response) => response.json())
			.then((data) => {
				console.log(
					data.current_weather.temperature,
					Math.ceil(data.current_weather.temperature)
				);
				temp = data.current_weather.temperature;
			});
	}
	function error(err) {
		var errMsg = err;
	}
	navigator.geolocation.getCurrentPosition(success, error);
	return temp;
};

// const weatherLocation = getLocation();
function generateWeatherURL(coords) {
	return `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`;
}

console.log(getLocation());
