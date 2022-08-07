const timeContainer = document.querySelector(".time");
const weatherDiv = document.querySelector(".weather");

const timeFuntion = function () {
	let time = new Date();
	timeContainer.innerHTML = "";
	const html = `<span>${time.toLocaleString("default", {
		timeStyle: "medium",
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

const coords = function locationPromise() {
	getLocationPromise().then((res) => {
		const { coords } = res;
		fetch(generateWeatherURL(coords))
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				weatherDiv.innerHTML = "";
				weatherDiv.innerHTML = `It is ${data.current_weather.temperature}&#176;C around you now.`;
			});
	});
};

coords();
setInterval(() => {
	coords();
}, 10800000);
