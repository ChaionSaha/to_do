const timeContainer = document.querySelector(".time");
const weatherDiv = document.querySelector(".weather");
const weatherRefresh = document.querySelector(".refresh");

////////////////////////////////////////////////////////
//// Notification
const notificationUI = function (
	text,
	bodyColor = "transparent",
	textColor = "black"
) {
	const notification = document.createElement("p");
	notification.style.borderColor = bodyColor;
	notification.style.color = textColor;
	notification.innerText = text;
	document
		.querySelector(".notification")
		.insertAdjacentElement("afterbegin", notification);
	setTimeout(() => {
		document.querySelector(".notification").removeChild(notification);
	}, 2000);
};

//////////////////////////////////////////////////
//// Geolocation promise

let getLocationPromise = () => {
	return new Promise(function (resolve, reject) {
		// Promisifying the geolocation API
		navigator.geolocation.getCurrentPosition(
			(position) => resolve(position),
			(error) => reject(error)
		);
	});
};

function generateWeatherURL(coords) {
	return `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`;
}

const weatherUI = function () {
	let data = JSON.parse(localStorage.getItem("weather"));
	// console.log(data);
	if (data === null) coords();
	else {
		weatherDiv.innerHTML = "";
		weatherDiv.style.color = "black";
		weatherDiv.innerHTML = `It is ${data.current_weather.temperature}&#176;C around you now. `;
	}
};

const coords = function locationPromise() {
	getLocationPromise()
		.then((res) => {
			const { coords } = res;
			fetch(generateWeatherURL(coords))
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					data.lastUpdateTime = Date.now();
					localStorage.setItem("weather", JSON.stringify(data));
					weatherRefresh.classList.remove("rotate");
					weatherUI();
					// console.log(`Now ${data.current_weather.temperature}`);
				})
				.catch((err) => {
					weatherRefresh.classList.remove("rotate");
					weatherDiv.innerHTML = "";
					weatherDiv.style.color = "red";
					weatherDiv.innerHTML = `${err.message}`;
				});
		})
		.catch((err) => {
			weatherDiv.innerHTML = "";
			weatherDiv.style.color = "red";
			weatherDiv.innerHTML = `${err.message}`;
			weatherRefresh.classList.remove("rotate");
		});
};

setInterval(() => {
	coords();
}, 10800000);

weatherUI();

///////////////////////////////////////////////////
/// Time showing functions
const timeFuntion = function () {
	let time = new Date();
	timeContainer.innerHTML = "";
	const html = `<span>${time.toLocaleString("default", {
		timeStyle: "medium",
		// timeZoneName: "long",
	})}</span>
    <span>Today is ${time.toLocaleString("default", {
		weekday: "long",
	})}</span>${time.toLocaleString("default", { dateStyle: "long" })} <span>`;
	timeContainer.innerHTML = html;
};

timeFuntion();

setInterval(() => {
	timeFuntion();
}, 1000);

weatherRefresh.addEventListener("click", (e) => {
	e.preventDefault();
	coords();
	weatherRefresh.classList.add("rotate");
});

document.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.target.classList.contains("btn")) {
		console.log(e.target.href);
		window.location.href = e.target.href;
	}
});

// let newArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(newArr.splice(0, 1), newArr);
