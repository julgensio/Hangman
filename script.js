const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
console.log(wrongLettersEl);

const figureParts = document.querySelectorAll('.figure-part');

const words = ['pasta', 'gangster', 'tovennaar', 'plantje', 'loodgieter'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
	wordEl.innerHTML = `
    ${selectedWord
			// Turn string into array splitting the letters
			.split('')
			// Check if the letter is included in the array from the words | if it is, output the letter | otherwise show an empty string
			.map(
				(letter) => `<span class="letter"> 
                ${correctLetters.includes(letter) ? letter : ''}
        </span>`
			)
			// Turn the letter back into a string from the array
			.join('')}`;

	// Fix new line character of each letter
	const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

	// Check if the words are equal and show final message pop up
	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Helemaal Mooi dit! 😈';
		popup.style.display = 'flex';
	}
}

// Update wrong letters
function updateWrongLetterEl() {
	console.log('update wrong' + wrongLettersEl);

	// Display wrong letters | map through each letter
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''} 
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

	// Display parts
	figureParts.forEach((part, index) => {
		// Check how many error are in the wrongletters
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = `je hebt verloren`;
		popup.style.display = 'flex';
	}
}

// Show notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

// keydown letter press
window.addEventListener('keydown', (e) => {
	// Check if only letters are typed in
	if (e.code >= 'KeyA' && e.code <= 'KeyZ') {
		// Check if the letter is in the selected word
		const letter = e.key;
		if (selectedWord.includes(letter)) {
			// If the correct letter is in the CorrectLetters push the letter into the array and update word.
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter);
				displayWord();
			} else {
				// Show the existing letter in notification
				showNotification();
			}
		} else {
			// If the wrong letter is typed push it into the wrongLetter array and update it
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);

				updateWrongLetterEl();
			} else {
				showNotification();
			}
		}
	}
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
	// Empty array
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();
	updateWrongLetterEl();

	popup.style.display = 'none';
});

displayWord();
