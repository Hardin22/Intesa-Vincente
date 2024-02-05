import React, { useState, useEffect } from 'react';
import words from '../assets/words.json';

export function generateWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function Generaparola({ currentWord }) {
    return (
        <div className="parola">
            <p>{currentWord}</p>
        </div>
    );
}

export default Generaparola;