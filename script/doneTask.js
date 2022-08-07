const tasksDiv = document.querySelector(".tasks");

let allTasks = JSON.parse(localStorage.getItem("user-1"));

const updateUI = function () {
	tasksDiv.innerHTML = "";
	const tasks = allTasks.filter((task) => {
		return task.isDone === true;
	});
	console.log(tasks);
	tasks.map((task) => {
		const divCreate = document.createElement("div");
		divCreate.classList.add("task");
		divCreate.innerHTML = "";
		const html = `
					<div class="header">
						<h1 class="Title">${task.title}</h1>
					</div>
					<h2 class="sub-header">${task.subHeader}</h2>
					<p class="Description">
						${task.description}
					</p>
					<div class="footer">
						<svg class="delete">
							<use
								xlink:href="../img/icomoon/symbol-defs.svg#icon-trashcan"
							></use>
						</svg>
					</div>`;
		divCreate.innerHTML = html;
		tasksDiv.appendChild(divCreate);
	});
};

updateUI();
