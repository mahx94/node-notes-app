const yargs = require('yargs')
const notes = require('./notes.js')

// Set yargs version
yargs.version('1.1.0')

// Add note command
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: { 
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note content',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.addNote(argv.title, argv.body)
	}
})

// Remove note command
yargs.command({
	command: 'del',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Name the note you want to remove',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.delNote(argv.title)
	}
})

// List notes command
yargs.command({
	command: 'list',
	describe: 'Lists existing notes',
	handler() {
		notes.getNotes()
	}
})

// Read note command
yargs.command({
	command: 'read',
	describe: 'Reads the contents of a note',
	builder: {
		title: {
			describe: 'Name the note you want to read',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.readNote(argv.title)
	}
})

yargs.parse();