var SONG_LENGTH = 8;

var cantusNotes = [];
var speciesOneNotes = [];
var speciesTwoNotes = [];


var majorNotes = [
	60, 62, 64, 65, 67, 69, 71, 72
];
var minorNotes = [
	60, 62, 63, 65, 67, 68, 70, 72
];
var consonance = [
	3, 5
];
var dissonance = [
	2, 6, 7
];

function getRandom(length) {
	return Math.floor(Math.random()*length);
}

function speciesOneCounterpoint(cantusNote, pos) {
	// species 1 counterpoint
	//
	//

	var counterNote = consonance[getRandom(consonance.length)];
	// b has no fifth... kinda
	while (cantusNote === 6 && counterNote === 5) {
		counterNote = consonance[getRandom(consonance.length)];
	}

	// avoid unison
	if (pos != 0 || pos != SONG_LENGTH-1) {
		while (counterNote === 8) {
			counterNote = consonance[getRandom(consonance.length)];
		}
	}

	// if up or down
	if (getRandom(2) == 0) {
		if (cantusNote - counterNote > 0) {
			return majorNotes[cantusNote - counterNote];
		} else {
			return majorNotes[cantusNote - counterNote + majorNotes.length-1];
		}
	} else {
		if (cantusNote + counterNote >= majorNotes.length) {
			return majorNotes[cantusNote + counterNote - majorNotes.length];
		} else {
			return majorNotes[cantusNote + counterNote];
		}
	}
}

function speciesTwoCounterpoint(cantusNote, pos) {
	// species two
	//
	//

	var counterNotes = [];
	for (var n=0; n < 2; n++) {
		var counterNote2 = consonance[getRandom(consonance.length)];
		while (cantusNote === 6 && counterNote2 === 5) {
			counterNote2 = consonance[getRandom(consonance.length)];
		}

		// avoid unison
		if (pos !== 0 || pos !== SONG_LENGTH-1) {
			while (counterNote2 == 8) {
				counterNote2 = consonance[getRandom(consonance.length)];
			}
		} else if (pos === 0) {
			if (getRandom(2) === 0) {
				counterNotes.push("");
			}
		}

		// up or down
		if (getRandom(2) === 0) {
			if (cantusNote - counterNote2 > 0) {
				counterNotes.push(majorNotes[cantusNote - counterNote2]);
			} else {
				counterNotes.push(majorNotes[cantusNote - counterNote2 + majorNotes.length-1]);
			}
		} else {
			if (cantusNote + counterNote2 >= majorNotes.length) {
				counterNotes.push(majorNotes[cantusNote + counterNote2 - majorNotes.length]);
			} else {
				counterNotes.push(majorNotes[cantusNote + counterNote2]);
			}
		}
	}
	return counterNotes;
}

function startTheMusic() {

	// init first note
	var cantusNote = getRandom(majorNotes.length);

	// randomize major/minor
	if (getRandom(2) === 0) {
		majorNotes = minorNotes;
		var minor = true;
	}

	// create theme
	for (var i=0; i< SONG_LENGTH; i++) {

		if (getRandom(2) === 0) {
			if (cantusNote -1 < 0) {
				cantusNote = majorNotes.length - 1;
			} else {
				cantusNote -= 1;
			}
		} else {
			if (cantusNote + 1 === majorNotes.length) {
				cantusNote = 0;
			} else {
				cantusNote += 1;
			}
		}

		cantusNotes.push(majorNotes[cantusNote]);
		speciesOneNotes.push(speciesOneCounterpoint(cantusNote, i));
		speciesTwoNotes.push(speciesTwoCounterpoint(cantusNote, i));

	}

	console.log('// Theme');
	console.log(cantusNotes);
	console.log('// Species one counterpoint');
	console.log(speciesOneNotes);
	console.log('// Species two counterpoint');
	console.log(speciesTwoNotes);

}
