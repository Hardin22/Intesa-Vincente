import React, { useState } from 'react';
import './components.css';
function Authentication({ onAuthenticated }) {
    const [password, setPassword] = useState('');
    const SECRET_PASSWORD = '';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === SECRET_PASSWORD) {
            onAuthenticated(true);
        } else {
            alert('Password errata');
        }
    };

    return (
        <div className="auth">
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Inserisci la password"
                />
                <button className="accedi" type="submit">Accedi</button>
            </form>
        </div>
    );
}

export default Authentication;
