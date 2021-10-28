const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['pasta', 'gangster', 'tovennaar', 'plantje', 'loodgieter'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

console.log(selectedWord);

const correctLetters = ['p', 'a', 's', 't', 'a'];
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

	const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Helemaal Mooi dit!';
		popup.style.display = 'flex';
	}
}

displayWord();
