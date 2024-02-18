var entries = {};

var entryCount = 0;


window.onload = () => {
  // load entries from local storage
  entryCount = parseInt(localStorage.getItem("entryCount"));
  entries = JSON.parse(localStorage.getItem("entries"));
  // entries = null;  
  if (entries == null) {
    entries = {};
  }
  if (isNaN(entryCount)) {
    entryCount = 0;
  }
  // saveEntries();
  console.log(entries);
  loadEntries();
}

window.onclick = function(event) {
  var modal = document.getElementById('titleModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

function setTitleModalStyle() {
  document.getElementById('titleModal').style.display = 'none';
}

function createJournalButton(title, loading = false, entryNumber = entryCount) {
  var journalDiv = document.createElement('div');
  journalDiv.style.maxWidth = '200px';
  journalDiv.style.marginRight = '85px';
  journalDiv.style.marginBottom = '0px';
  journalDiv.style.marginTop = '0px';
  journalDiv.classList.add('journal');

  var journalImage = document.createElement('img');
  journalImage.src = '/images/diary.png'; // Ensure the path to your image is correct
  journalImage.style.width = '120%';
  journalImage.style.opacity = '0.6';
  journalImage.alt = 'Journal';

  var journalTitle = document.createElement('div');
  var displayTitle = title;
  if (displayTitle.size > 21) {
    displayTitle = displayTitle.substring(0, 18);
    displayTitle += '...';
  }
  journalTitle.textContent = title;
  journalTitle.style.color = '#CFD8D7';
  journalTitle.style.textAlign = 'left';
  journalTitle.style.fontSize = '25px';
  journalTitle.style.marginTop = '8px';
  journalTitle.style.marginLeft = '8px';

  journalX = document.createElement('button');
  journalX.style.background = "none";
  journalX.style.border = "none";
  journalX.innerHTML = '<img src=/images/xmark.png>';
  journalX.style.width = '50px';
  journalX.style.height = '50px';
  journalX.style.position = "relative";
  journalX.style.zIndex = "1000";
  journalX.style.right = "85px";
  journalX.style.bottom = "285px";
	journalX.style.cursor = "pointer";

  journalX.addEventListener("click", function() {
    delete entries[entryNumber];
    saveEntries();
    loadEntries();
  });

  journalDiv.appendChild(journalImage);
  journalDiv.appendChild(journalTitle);
  journalDiv.appendChild(journalX);

  journalImage.style.cursor = "pointer";

  if (loading) {
    journalDiv.id = entryNumber;
    journalImage.id = entryNumber;
  } else {
    journalDiv.id = entryCount;
    journalImage.id = entryCount;
  }
  // journalDiv.style.backgroundColor = "red";

  journalImage.addEventListener("click", () => {
    console.log("Div: " + journalImage.id);
    sessionStorage.setItem("entryNum", journalImage.id);
    window.location.href = "/journal/entry.html";
    return;
  });

  var journalsContainer = document.querySelector('.journals-container');
  // This ensures the newest journal is added to the start (left side) of the container
  console.log(loading);
  if (!loading) {
    entries[entryCount] = { title: title, content: "" };
    entryCount++;
    saveEntries();
  }
  console.log(journalsContainer);
  journalsContainer.insertBefore(journalDiv, journalsContainer.firstChild);
}

function checkForEnter() {
	if (event.keyCode == 13) {
		console.log("enter");
		setTitle();
	}
}

function titleCaller() {
  document.getElementById('titleModal').style.display = 'block';
	document.getElementById("titleInput").focus();
}
function setTitle() {
  var userInput = document.getElementById('titleInput').value;
  if (userInput.trim() !== '') {
    createJournalButton(userInput);
    document.getElementById('titleModal').style.display = 'none';
    document.getElementById('titleInput').value = ''; // Clear the input field
  }
}

function saveEntries() {
  localStorage.setItem("entryCount", entryCount.toString());
  localStorage.setItem("entries", JSON.stringify(entries));
}

function loadEntries() {
  // load all entries
  document.querySelector('.journals-container').innerHTML = '';
  let keyList = Object.keys(entries);
  console.log(keyList);
  for (const entryNum in entries) {
    console.log(entryNum);
    console.log(entries[entryNum]["title"]);
    createJournalButton(entries[entryNum]["title"], true, entryNum);
  }
}