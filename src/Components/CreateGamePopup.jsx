import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, onValue, off } from 'firebase/database';

const CreateGamePopup = ({ code, onClose }) => {
    const [isWaiting, setIsWaiting] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');
    const navigate = useNavigate();
    const db = getDatabase();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setCopySuccess('Codice copiato!');
            }, () => {
                setCopySuccess('Impossibile copiare il codice!');
            });
    };
    const createGame = () => {
        const gameRef = ref(db, 'partite/' + code);
        set(gameRef, {
            codicePartita: code,
            stato: 'attesaGiocatore',
            ruoli: { principale: null, pulsantiera: null },
            tempo: 60,
            punteggio: 0,
            passo: 3,
            parola: '',
            timerStatus: 'stop',
            creato: Date.now()
        }).then(() => {
            console.log('Partita creata con successo con codice:', code);
            setIsWaiting(true); // Imposta il gioco come in attesa
        }).catch((error) => {
            console.error("Errore nella creazione della partita:", error);
        });
    };

    // Effetto per ascoltare i cambiamenti nel database
    useEffect(() => {
        if (isWaiting) {
            const gameRef = ref(db, 'partite/' + code);

            // Aggiunge un ascoltatore per i cambiamenti al riferimento della partita.
            const unsubscribe = onValue(gameRef, (snapshot) => {
                const game = snapshot.val();
                if (game && game.stato === 'inCorso') {
                    navigate(`/game/${code}`);
                }
            });

            // Questa è la funzione di pulizia che verrà chiamata quando il componente viene smontato
            // o se le dipendenze dell'effetto cambiano.
            return () => {
                off(gameRef); // Usa off() per rimuovere l'ascoltatore dal riferimento specifico
            };
        }
        // Non includere 'db' nell'array delle dipendenze se non cambia nel tempo.
    }, [code, isWaiting, navigate]);


    return (
        <div className="popup">
            <div className="popup-inner">
                <h2 className="centro">Crea Partita</h2>
                {isWaiting ? (
                    <>
                        <p>In attesa dell'altro giocatore...</p>
                        <p className="centro"><strong>{code}</strong></p>
                        <div className="centro">
                            <button className="centro" onClick={copyToClipboard}>Copia Codice</button>
                        </div>
                        {copySuccess && <p>{copySuccess}</p>}
                    </>
                ) : (
                    <>
                        <p>Il codice della tua partita è: <strong>{code}</strong></p>
                        <button onClick={createGame}>Crea Partita</button>
                        <button onClick={copyToClipboard}>Copia Codice</button>
                        {copySuccess && <p>{copySuccess}</p>}
                    </>
                )}
                <div className="centro">
                    <button onClick={onClose}>Chiudi</button>
                </div>
            </div>
        </div>
    );
};

export default CreateGamePopup;
