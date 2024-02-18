let entryNum = 0;
var entry = {};

var titleField;
var contentField;

window.onload = () => {
	titleField = document.getElementById('title-field');
	contentField = document.getElementById('entry-field');

	entryNum = parseInt(sessionStorage.getItem("entryNum"));
	entry = JSON.parse(localStorage.getItem("entries"))[entryNum];

	console.log(entry);

	titleField.innerHTML = entry.title;
	contentField.value = entry.content;
};

function submitJournal(returnToHome = true) {
	var entries = JSON.parse(localStorage.getItem("entries"));
	entries[entryNum].content = contentField.value;
	localStorage.setItem("entries", JSON.stringify(entries));
	if (returnToHome) {
		window.location.href = "/journal/journal.html";
	}
}

function backToJournal() {
	submitJournal();
	window.location.href = "/journal/journal.html";
}

function checkForEnter() {
	if (event.keyCode === 13) {
		submitJournal(false);
	}
}