import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import '../components/components.css';
const GameScreen = () => {
    const { gameCode } = useParams();
    const navigate = useNavigate();
    const [roleTaken, setRoleTaken] = useState('');

    useEffect(() => {
        const db = getDatabase();
        const gameRef = ref(db, `partite/${gameCode}`);
        const unsubscribe = onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Controlla se un ruolo è già stato scelto
                if (data.ruoloPrincipale || data.ruoloPulsantiera) {
                    setRoleTaken(data.ruoloPrincipale ? 'principale' : 'pulsantiera');
                }
            }
        });

        return () => unsubscribe();
    }, [gameCode]);

    const chooseRole = (chosenRole) => {
        const db = getDatabase();
        const updates = {};
        if (chosenRole === 'principale') {
            updates[`partite/${gameCode}/ruoloPrincipale`] = true;
            navigate(`/principale/${gameCode}`);
        } else {
            updates[`partite/${gameCode}/ruoloPulsantiera`] = true;
            navigate(`/pulsantiera/${gameCode}`);
        }
        update(ref(db), updates);
    };

    useEffect(() => {
        // Se un ruolo è già stato preso, reindirizza automaticamente l'altro giocatore al ruolo opposto
        if (roleTaken === 'principale') {
            navigate(`/pulsantiera/${gameCode}`);
        } else if (roleTaken === 'pulsantiera') {
            navigate(`/principale/${gameCode}`);
        }
    }, [roleTaken, gameCode, navigate]);

    return (
        <div>
            <h1 className="titolo">Seleziona il tuo ruolo per la partita: {gameCode}</h1>
            <div className="tasti">
                <button disabled={roleTaken === 'principale'} onClick={() => chooseRole('principale')}>Principale</button>
                <button disabled={roleTaken === 'pulsantiera'} onClick={() => chooseRole('pulsantiera')}>Pulsantiera</button>
            </div>
        </div>
    );
};

export default GameScreen;
