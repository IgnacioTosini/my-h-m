import { useState, useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';

const CheckoutForm = ({ onConfirm }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const { darkMode } = useContext(DarkModeContext);

    const handleConfirm = (event) => {
        event.preventDefault();

        const userData = {
            name,
            phone,
            email,
        };

        onConfirm(userData);
    };

    return (
        <div className={`containerCheckOutForm ${darkMode ? "dark-mode" : ''}`}>
            <form onSubmit={handleConfirm} className="checkout-form">
                <div className="input-group">
                    <label htmlFor="name" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder={'Nombre'}
                        onChange={({ target }) => setName(target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="phone" className="form-label">
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Teléfono"
                        onChange={({ target }) => setPhone(target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email" className="form-label">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder={'Correo electrónico'}
                        onChange={({ target }) => setEmail(target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="form-button">
                        Confirmar pedido
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
