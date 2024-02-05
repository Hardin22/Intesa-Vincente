import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { generateWord } from './Generaparola';

export default function Cronometro({ gameCode, onWordGenerated }) {
    const db = getDatabase();
    const [seconds, setSeconds] = useState(60);
    const [timerStatus, setTimerStatus] = useState('stop'); // Aggiunto per tracciare lo stato del timer da Firebase

    // Funzione per commutare lo stato del timer in Firebase
    const toggleTimer = () => {
        const newStatus = timerStatus === 'stop' ? 'active' : 'stop';
        const statusRef = ref(db, `partite/${gameCode}/timerStatus`);
        update(statusRef, { timerStatus: newStatus });

        if (newStatus === 'active') {
            const newWord = generateWord();
            onWordGenerated(newWord); // Genera e passa la nuova parola solo se il timer viene avviato
        }
    };

    // Ascolta i cambiamenti nello stato del timer in Firebase
    useEffect(() => {
        const statusRef = ref(db, `partite/${gameCode}/timerStatus`);
        const unsubscribe = onValue(statusRef, (snapshot) => {
            const status = snapshot.val()?.timerStatus;
            setTimerStatus(status);
        });

        return () => unsubscribe();
    }, [gameCode, db]);

    // Gestisce il conteggio del timer
    useEffect(() => {
        let interval = null;
        if (timerStatus === 'active') {
            interval = setInterval(() => {
                setSeconds(prevSeconds => {
                    const nextSeconds = prevSeconds > 0 ? prevSeconds - 1 : 0;
                    if (nextSeconds > 0) {
                        update(ref(db, `partite/${gameCode}`), { tempo: nextSeconds });
                    }
                    return nextSeconds;
                });
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerStatus, seconds, gameCode, db]);

    return (
        <div>
            <button className="avvia" onClick={toggleTimer}>
                {timerStatus === 'active' ? 'STOP' : 'AVVIA'}
            </button>
        </div>
    );
}


export function Secondi({ gameCode }) {
    const db = getDatabase();
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        const timerRef = ref(db, `partite/${gameCode}/tempo`);
        const unsubscribe = onValue(timerRef, (snapshot) => {
            const tempo = snapshot.val();
            if (typeof tempo === 'number') {
                setSeconds(tempo);
            }
        });

        return () => unsubscribe();
    }, [gameCode, db]);

    return (
        <div>
            <p className="punteggio">{seconds}s</p>
        </div>
    );
}

