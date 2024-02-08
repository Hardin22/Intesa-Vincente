import React from 'react';
import words from '../assets/words.json';

let currentIndex = 0;
let scrambledWords = [...words];

function scrambleWords() {
    for (let i = scrambledWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [scrambledWords[i], scrambledWords[j]] = [scrambledWords[j], scrambledWords[i]];
    }
}

scrambleWords();

export function generateWord() {
    if (currentIndex >= scrambledWords.length) {
        scrambleWords();
        currentIndex = 0;
    }
    const currentWord = scrambledWords[currentIndex++];
    return currentWord;
}

function Generaparola({ currentWord }) {
    return (
        <div className="parola">
            <p>{currentWord}</p>
        </div>
    );
}

export default Generaparola;