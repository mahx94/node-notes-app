const fs = require('fs')
const chalk = require('chalk')
const { array } = require('yargs')

// getNotes function
const getNotes = function() {
	const notes = loadNotes()

	console.log(chalk.underline.blue('Your Notes:'))
	notes.forEach((note) => {
		console.log(note.title)
	});
}

// readNote function
const readNote = function(title) {
	const notes = loadNotes()
	const note = notes.find((note) => note.title === title)

	if (note) {
		console.log(chalk.blue.underline(note.title + "\n") + note.body)
	} else {
		console.log(chalk.red('NB!: Note not found!"'))
	}
}

// addNote function
const addNote = function(title, body) {
	const notes = loadNotes()

	if ( !notes.find((note) => note.title === title) ) {
		notes.push({
			title: title,
			body: body
		})
		saveNotes(notes)
		console.log(chalk.green('New note added'))
	} else {
		console.log(chalk.red('NB!: Note title taken!'))
	}
}

// delNote function
const delNote = function(title) {
	const notes = loadNotes()
	const newNotes = notes.filter( (note) => note.title !== title )

	if (notes.length > newNotes.length) {
		saveNotes(newNotes)
		console.log(chalk.green('The note named') + chalk.yellow(' \"' + title + '\" ') + chalk.green('was successfully removed!'))
	} else {
		console.log(chalk.red('NB!: The specified note can not be found!'))
	}
}

// method for saving notes to fs
const saveNotes = function(notes) {
	const data = JSON.stringify(notes)
	fs.writeFileSync('notes.json', data)
}

// method to retrieve notes from fs
const loadNotes = function() {
	try {
		const dataBuffer = fs.readFileSync('notes.json')
		return JSON.parse(dataBuffer.toString())
	} catch (e) {
		return []
	}
}

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	delNote: delNote,
	readNote: readNote
}