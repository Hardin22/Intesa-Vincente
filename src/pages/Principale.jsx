import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { Secondi } from '../Components/Cronometro';
import Generaparola from '../Components/Generaparola';
import Passo from "../Components/Passo.jsx";
import Punteggio from "../Components/Punteggio.jsx";
import "../components/components.css";

function Principale({ gameCode }) {
    const [currentWord, setCurrentWord] = useState('');
    const [currentPasso, setCurrentPasso] = useState(null);
    const db = getDatabase();

    useEffect(() => {
        const wordRef = ref(db, `partite/${gameCode}/parola`);
        const passoRef = ref(db, `partite/${gameCode}/passo`);
        const unsubscribeWord = onValue(wordRef, (snapshot) => {
            const data = snapshot.val();
            setCurrentWord(data || '');
        });
        const unsubscribePasso = onValue(passoRef, (snapshot) => {
            const passo = snapshot.val();
            setCurrentPasso(passo);
        });

        return () => {
            unsubscribeWord();
            unsubscribePasso();
        };
    }, [gameCode, db]);

    const handlePassoClick = () => {
        const gameRef = ref(db, `partite/${gameCode}/timerStatus`);

        // Ottieni il valore attuale di passo e decrementalo
        onValue(ref(db, `partite/${gameCode}/passo`), (snapshot) => {
            const currentPasso = snapshot.val();
            const newPasso = currentPasso > 0 ? currentPasso - 1 : currentPasso; // Evita di andare sotto 0

            // Aggiorna sia passo che timerStatus in un'unica operazione
            update(ref(db, `partite/${gameCode}`), { passo: newPasso });
            update(gameRef, { timerStatus: "stop" });
        }, { onlyOnce: true });
    };


    return (
        <section className="sezionepulsantiera">
            <div className="info">
                <div className="nome">
                    <h1 className="nomepulsa">Principale</h1>
                </div>
                <Punteggio gameCode={gameCode} />
                <Generaparola currentWord={currentWord} />
                <Secondi gameCode={gameCode} />
                <Passo gameCode={gameCode} />
                <button className="passo" onClick={handlePassoClick}>Passo!</button>
                {currentPasso === 0 && <p className="passoterminati">passo terminati</p>}
            </div>
        </section>
    );
}

export default Principale;