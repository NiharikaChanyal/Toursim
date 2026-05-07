import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // LocalStorage clear 
        localStorage.removeItem("user");
        console.log("User logged out from Signup component");

        // redirect to login after 1s
        const timer = setTimeout(() => {
            navigate("/login");
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>Processing...</h2>
            <p>Logging you out and redirecting to Login page.</p>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Signup;