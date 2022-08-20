const tasksDiv = document.querySelector(".tasks");
let allTasks = JSON.parse(localStorage.getItem("user-1"));

let counter = 0;

const updateUI = function () {
	tasksDiv.innerHTML = "";
	allTasks.map((task) => {
		if (task.isDone === false) return;
		counter++;
		const divCreate = document.createElement("div");
		divCreate.classList.add("task");
		divCreate.dataset.id = `${task.id}`;
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

function uiDecision() {
	if (allTasks === null || counter === 0) {
		tasksDiv.innerHTML = "";
		const divCreate = document.createElement("div");
		divCreate.classList.add("empty-error");
		divCreate.innerHTML = `Add tasks to view here`;
		tasksDiv.appendChild(divCreate);
	} else updateUI();
}

document.addEventListener("click", (e) => {
	if (e.target.classList.contains("delete")) {
		const targetID = e.target.parentElement.parentElement.dataset.id;
		const targetIndex = allTasks.findIndex((t) => {
			return t.id == targetID;
		});
		allTasks.splice(targetIndex, 1);
		localStorage.setItem("user-1", JSON.stringify(allTasks));
		updateUI();
	}
});
