// useSession.js
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../Context/CartContext';

const SESSION_REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minute

const useSession = () => {
    const [sessionId, setSessionId] = useState(null);
    const { clearCart, setCartItems } = useContext(CartContext);

    const url = process.env.REACT_APP_BASE_URL;

    const fetchSession = async () => {
        try {
            const response = await axios.post(url + '/api/generate-session/');
            setSessionId(response.data.session_id);
            sessionStorage.setItem('sessionId', response.data.session_id);
        } catch (error) {
            console.error('Error fetching session:', error);
        }
    };

    useEffect(() => {
        const storedSessionId = sessionStorage.getItem('sessionId');
        setSessionId(storedSessionId);

        if (!storedSessionId) {
            fetchSession();
        }
    }, []);

    useEffect(() => {
        const refreshInterval = setInterval(() => {
            clearCart();
            sessionStorage.removeItem('sessionId');    
            clearInterval(refreshInterval);
        }, SESSION_REFRESH_INTERVAL);

        return () => clearInterval(refreshInterval);
    }, []);


    return { sessionId };
};

export default useSession;
