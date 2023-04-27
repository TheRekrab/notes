const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");

const resultContainer = document.getElementById("resultContainer");

// Code copied from https://www.30secondsofcode.org/js/s/parse-cookie/
const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

function getNotes() {
	let cookies = parseCookie(document.cookie);
	let notes = cookies["notes"];
	let decoded = JSON.parse(notes);
	return decoded;
}

function deleteNote(deadNote) {
	
	let noteText = deadNote.firstChild.innerText;
	
	let cookies = getNotes();

	let index = cookies.indexOf(noteText);

	cookies.splice(index, 1);

	document.cookie = `notes=${JSON.stringify(cookies)};`

	resultContainer.removeChild(deadNote);
}

function saveNote(note=null) {
	const newNote = (!note) ? noteInput.value.trim(): note;

	if (newNote == "") {
		console.warn("Please don't use empty notes. Ignoring the note.");
		noteInput.value = "";
		return;
	}

	/* Add the note to the cookies to save for later, if it's not already there: */
	let currentCookies = parseCookie(document.cookie);
	let notes = JSON.parse(currentCookies['notes']);

	if (!notes.includes(newNote)) {
		notes.push(newNote);
		document.cookie = "notes=" + JSON.stringify(notes) + ';';
	}

	let newNoteSection = document.createElement('section');
	let newNoteP = document.createElement('p');
	let newNoteText = document.createTextNode(newNote);
	let newNoteDel = document.createElement('img');

	newNoteSection.classList.add("note");
	newNoteDel.classList.add("trash_icon");

	newNoteDel.src = "trash_icon.png";
	newNoteDel.title = "Click to delete Note";
	newNoteDel.onclick = () => {
		deleteNote(newNoteSection);
	};

	newNoteP.appendChild(newNoteText);
	newNoteSection.appendChild(newNoteP);
	newNoteSection.appendChild(newNoteDel);
	resultContainer.appendChild(newNoteSection);

	noteInput.value = "";
}

function getNewNotes() {
	if (!document.cookie) {
		document.cookie = "notes=[]";
		getNewNotes();
		return;
	}
	const cookies = parseCookie(document.cookie);
	let notesToAdd = JSON.parse(cookies["notes"]);

	for (let note of notesToAdd) {
		saveNote(note);
	}
}

noteForm.onsubmit = () => {
	saveNote();
	return false;
}

getNewNotes();
