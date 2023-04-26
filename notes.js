const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");

const resultContainer = document.getElementById("resultContainer");

const firstNote = document.getElementsByClassName("note")[0];
const firstDelBtn = document.getElementById("firstDelBtn")

function deleteNote(deadNote) {
	resultContainer.removeChild(deadNote);
}

function saveNote() {
	const newNote = noteInput.value.trim();

	if (newNote == "") {
		console.warn("Please don't use empty notes. Ignoring the note.");
		noteInput.value = "";
		return;
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

noteForm.onsubmit = () => {
	saveNote();
	return false;
}

firstDelBtn.onclick = () => {
	deleteNote(firstNote);
}
