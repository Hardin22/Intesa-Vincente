import React, { useState } from 'react';
import { getDatabase, ref, update } from 'firebase/database';
import Passo from '../Components/Passo';
import Cronometro, { Secondi } from '../Components/Cronometro';
import Punteggio from '../Components/Punteggio';
import './Pulsantiera.css';
import { generateWord } from '../Components/Generaparola'; // Assicurati che il percorso sia corretto

function Pulsantiera({ gameCode }) {
    const db = getDatabase();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({ passo: 3, seconds: 60 });
    const [punteggio, setPunteggio] = useState(0);


    const incrementa = () => {
        setPunteggio(punteggio + 1);
        update(ref(db, `partite/${gameCode}`), { punteggio: punteggio + 1 });
    };

    const decrementa = () => {
        if (punteggio > 0) {
            setPunteggio(punteggio - 1);
            update(ref(db, `partite/${gameCode}`), { punteggio: punteggio - 1 });
        }
    };

    function handleInputChange(event) {
        setFormValues({
            ...formValues,
            [event.target.name]: parseInt(event.target.value, 10)
        });
    }

    function reset() {
        setPunteggio(0);
        update(ref(db, `partite/${gameCode}`), { tempo: formValues.seconds, passo: formValues.passo, punteggio: 0 });
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        update(ref(db, `partite/${gameCode}`), { tempo: formValues.seconds, passo: formValues.passo });
        setIsModalOpen(false);
    }

    function toggleModal() {
        setIsModalOpen(!isModalOpen);
    }

    // Funzione per generare e aggiornare la parola nel database
    const generateAndSetWord = () => {
        const newWord = generateWord();
        update(ref(db, `partite/${gameCode}`), { parola: newWord });
        return newWord; // Restituisci la nuova parola
    };

    return (
        <section className="sezionepulsantiera">
            <div className="info">
                <div className="nome">
                    <h1 className="nomepulsa">Pulsantiera</h1>
                </div>
                <button className="modifica" onClick={toggleModal}>Modifica impostazioni</button>
                <Punteggio gameCode={gameCode} punteggio={punteggio} />
            </div>
            <div className="divisore"></div>
            <div className="pulsanti">
                <Cronometro gameCode={gameCode} onWordGenerated={generateAndSetWord} currentWord={generateAndSetWord()} />                <Passo gameCode={gameCode} />
                <div className="piùmeno">
                    <button className="meno" onClick={decrementa}>-</button>
                    <Secondi gameCode={gameCode} />
                    <button className="più" onClick={incrementa}>+</button>
                </div>
                <button className="reset" onClick={reset}>↺</button>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="chiudi" onClick={toggleModal}>X</button>
                        <form onSubmit={handleFormSubmit}>
                            <div className="lables">
                                <div className="allineamento">
                                    <label>
                                        <p className="desc">N.Passo:</p>
                                        <input className="input" type="number" name="passo" value={formValues.passo} onChange={handleInputChange}/>
                                    </label>
                                </div>
                                <div className="allineamento">
                                    <label>
                                        <p className="desc">Secondi:</p>
                                        <input className="input" type="number" name="seconds" value={formValues.seconds} onChange={handleInputChange}/>
                                    </label>
                                </div>
                            </div>
                            <div className="centro">
                                <button className="salva" type="submit">Salva</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Pulsantiera;
