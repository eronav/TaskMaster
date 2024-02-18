const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dropdown = document.getElementById("setting");

const UNCHECKED = 0;
const CHECKED = 1;
var DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var tasks = [[new Set(), new Set()], [new Set(), new Set()], [new Set(), new Set()], [new Set(), new Set()], [new Set(), new Set()], [new Set(), new Set()], [new Set(), new Set()]]; // array of sets for each day

window.onload = () => {
	const d = new Date();
	if (d.getDay() == 1 && d.getHours() == 0) {
		// reset tasks
		tasks = [[new Set(), new Set()], [new Set(), new Set()], [new Set(), new Set()], [new Set(), new Set()], [new Set(), new Set()], [new Set(), new Set()], [new Set(), new Set()]];
		saveTasks();
		showTasks();
	}
}

function serialize() {
	var s = [];
	for (var i = 0; i < tasks.length; i++) {
		var dayList = JSON.stringify([JSON.stringify([...tasks[i][UNCHECKED]]), JSON.stringify([...tasks[i][CHECKED]])]);
		s.push(dayList);
	}
	return JSON.stringify(s);
}

function deserialize(s) {
	var des = JSON.parse(s);
	var s = [];
	for (var i = 0; i < des.length; i++) {
		var dayList = JSON.parse(des[i]);
		dayList = [new Set(JSON.parse(dayList[0])), new Set(JSON.parse(dayList[1]))]
		s.push(dayList);
	}
	return s;
}

function addTask(taskText = inputBox.value, ischecked = false, dayIdx = dropdown.value, container = listContainer) {
	if (dropdown.value == 7 && container == listContainer) {
		alert("You cannot add items in the weekly view");
		return;
	}
	if (taskText == '') {
		alert("You must write something!");
	} else {
		let li = document.createElement("li");
		li.innerHTML = taskText;
		if (ischecked) {
			li.classList.add("checked");
		}
		if (ischecked) {
			tasks[dayIdx][CHECKED].add(taskText);
		} else {
			tasks[dayIdx][UNCHECKED].add(taskText);
		}
		container.appendChild(li);
		let span = document.createElement("span")
		span.innerHTML = "\u00d7";
		span.id = dayIdx.toString() + taskText;
		li.id = dayIdx.toString() + taskText;
		li.appendChild(span)
	}
	inputBox.value = "";
	saveTasks(false);
}

dropdown.onchange = (event) => {
	// console.log(event.target);
	// console.log(event.target.value);
	showTasks();
}

listContainer.addEventListener("click", function(e) {
	let dayIdx = parseInt(e.target.id[0]);
	let taskName = e.target.id.substring(1);
	// console.log("taskName: " + taskName);
	// console.log("dayIdx: " + dayIdx);
	if (e.target.tagName === "LI") {
		if (tasks[dayIdx][UNCHECKED].has(taskName)) {
			tasks[dayIdx][UNCHECKED].delete(taskName);
			tasks[dayIdx][CHECKED].add(taskName);
		} else {
			tasks[dayIdx][UNCHECKED].add(taskName);
			tasks[dayIdx][CHECKED].delete(taskName);
		}
		e.target.classList.toggle("checked");
		// console.log("toggling");
		saveTasks();
	}
	else if (e.target.tagName === "SPAN") {
		// console.log("delete " + taskName);
		tasks[dayIdx][UNCHECKED].delete(taskName);
		tasks[dayIdx][CHECKED].delete(taskName);
		e.target.parentElement.remove();
		saveTasks();
	}
	// console.log(tasks[dayIdx][CHECKED]);
	// console.log(tasks[dayIdx][UNCHECKED]);
}, false);

function saveTasks(shouldReload = true) {
	s = serialize();
	// console.log(s);
	localStorage.setItem("tasks", s);
	if (shouldReload) {
		showTasks();
	}
}
function showTasks(reloading = false) {
	if (reloading) {
		let ts = localStorage.getItem("tasks");
		// console.log(ts);
		if (ts == null) {
			return;
		}
		tasks = deserialize(ts);
	}
	listContainer.innerHTML = "";
	if (dropdown.value == 7) {
		for (var i = 0; i < DAYS.length; i++) {
			// console.log(tasks[i]);
			let section = document.createElement("section");
			let header = document.createElement("header");
			header.innerHTML = DAYS[i];
			section.appendChild(header);
			if (tasks[i][UNCHECKED].size + tasks[i][CHECKED].size > 0) {
				for (let j of tasks[i][UNCHECKED]) {
					addTask(j, false, i, section);
				}
				for (let j of tasks[i][CHECKED]) {
					addTask(j, true, i, section);
				}
			} else {
				let btn = document.createElement("button");
				btn.innerHTML = "Add Task";
				btn.style.height = "30px";
				btn.style.width = "100%";
				btn.classList.add("long-add-task");
				btn.id = i.toString();
				// console.log("I: " + btn.id);
				btn.addEventListener('click', () => {
					// console.log(btn);
					// console.log("Id: " + parseInt(btn.id));
					dropdown.value = parseInt(btn.id);
					// console.log("Val: " + dropdown.value);
					dropdown.dispatchEvent(new Event('change'));
				});
				section.appendChild(btn);
			}
			listContainer.appendChild(section);
		}
	} else {
		// console.log(dropdown.value);
		for (let i of tasks[dropdown.value][UNCHECKED]) {
			addTask(i, false);
		}
		for (let i of tasks[dropdown.value][CHECKED]) {
			addTask(i, true);
		}
	}
}

showTasks(true);