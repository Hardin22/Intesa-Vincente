import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

function Punteggio({ gameCode }) {
    const db = getDatabase();
    const [punteggio, setPunteggio] = useState(0);

    useEffect(() => {
        const scoreRef = ref(db, `partite/${gameCode}/punteggio`);
        const unsubscribe = onValue(scoreRef, (snapshot) => {
            const punteggio = snapshot.val();
            if (typeof punteggio === 'number') {
                setPunteggio(punteggio);
            }
        });

        return () => unsubscribe();
    }, [gameCode, db]);

    return (
        <div>
            <p className="punteggio">{punteggio}</p>
        </div>
    );
}

export default Punteggio;