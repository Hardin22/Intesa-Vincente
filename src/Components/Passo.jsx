import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';

function Passo({ gameCode }) {
    const db = getDatabase();
    const [passo, setPasso] = useState(0);

    useEffect(() => {
        const passoRef = ref(db, `partite/${gameCode}/passo`);
        const unsubscribe = onValue(passoRef, (snapshot) => {
            const passo = snapshot.val();
            if (typeof passo === 'number') {
                setPasso(passo);
            }
        });

        return () => unsubscribe();
    }, [gameCode, db]);

    return (
        <div>

            <p className="countpasso">Passo: {passo}</p>
        </div>
    );
}

export default Passo;