import React, { useState } from 'react';
import { getDatabase, ref, get, child, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const JoinGamePopup = ({ onClose }) => {
    const [gameCode, setGameCode] = useState('');
    const navigate = useNavigate();

    const joinGame = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `partite/${gameCode}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log('Partita trovata:', snapshot.val());
                // Aggiorna lo stato della partita per indicare che il giocatore si è unito
                const updates = {};
                updates[`partite/${gameCode}/stato`] = 'inCorso';
                update(ref(getDatabase()), updates).then(() => {
                    navigate(`/game/${gameCode}`); // Reindirizza alla pagina del gioco
                    onClose(); // Chiude il popup
                });
            } else {
                console.log('Nessuna partita trovata con questo codice.');
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <div className="centro">
                    <h2>Unisciti a una Partita</h2>
                </div>

                <input type="text" value={gameCode} onChange={(e) => setGameCode(e.target.value.toUpperCase())} placeholder="Inserisci Codice Partita" />
                <button onClick={joinGame}>Unisciti</button>
                <div className="centro">
                    <button onClick={onClose}>Chiudi</button>
                </div>
            </div>
        </div>
    );
};

export default JoinGamePopup;
