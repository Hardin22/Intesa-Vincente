import React, { useState } from 'react';
import CreateGamePopup from '../components/CreateGamePopup';
import JoinGamePopup from '../components/JoinGamePopup';
import './Landing.css';
export default function Landing() {
    const [showJoinPopup, setShowJoinPopup] = useState(false);
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [gameCode, setGameCode] = useState('');

    const handleCreateGame = () => {
        // Chiudi il popup di partecipazione se aperto
        if (showJoinPopup) setShowJoinPopup(false);
        // Genera un codice univoco per la partita
        const uniqueCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setGameCode(uniqueCode);
        setShowCreatePopup(true);
    };

    const handleJoinGame = () => {
        // Chiudi il popup di creazione se aperto
        if (showCreatePopup) setShowCreatePopup(false);
        setShowJoinPopup(true);
    };

    return (
        <div className="container">
            <div className="landing">
                <h1 className="testocolorato">Intesa Vincente</h1>
                <button onClick={handleCreateGame}>Crea Partita</button>
                <button onClick={handleJoinGame}>Partecipa Partita</button>
                {showCreatePopup && <CreateGamePopup code={gameCode} onClose={() => setShowCreatePopup(false)}/>}
                {showJoinPopup && <JoinGamePopup onClose={() => setShowJoinPopup(false)}/>}
            </div>
            <footer className="footer">
                <p>Realizzato con autismo dal vostro 10x developer di fiducia<br/><a
                    href="https://github.com/Hardin22">Francesco Albano</a></p>
            </footer>
        </div>
    );
}
