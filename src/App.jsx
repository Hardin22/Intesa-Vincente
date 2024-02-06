import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
//import Authentication from './components/Authentication'; // Assicurati che il percorso sia corretto
import Landing from './pages/Landing';
import GameScreen from './pages/GameScreen';
import Principale from './pages/Principale';
import Pulsantiera from './pages/Pulsantiera';

function App() {
    return (
        <Router basename="/Intesa_vincente">
            <div className="App">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/game/:gameCode" element={<GameScreen />} />
                    <Route path="/principale/:gameCode" element={<PrincipaleWrapper />} />
                    <Route path="/pulsantiera/:gameCode" element={<PulsantieraWrapper />} />
                </Routes>
            </div>
        </Router>
    );
}

// Componenti wrapper che renderizzano Principale e Pulsantiera passando loro gameCode come prop
function PrincipaleWrapper() {
    const { gameCode } = useParams();
    return <Principale gameCode={gameCode} />;
}

function PulsantieraWrapper() {
    const { gameCode } = useParams();
    return <Pulsantiera gameCode={gameCode} />;
}

export default App;
