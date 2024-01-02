import React, { useEffect, useState } from 'react';
import './Register.css';
import AuthService from "../../auth/Auth";
import { useNavigate } from 'react-router';
import CustomInput from "../../components/custom-input/CustomInput";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false)
    const navigate = useNavigate();
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleAdminChange = () => {
        setIsAdmin(!isAdmin);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const role = isAdmin ? 'admin' : 'user'
        AuthService.registration({name, email, password, role})
            .then(() => navigate('/'))
    };

    const handleTogglePass = (e) => {
        setTogglePassword(!togglePassword)
    }

    useEffect(() => {
        if (AuthService.getIsAuthenticated()) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='register-wrapper'>
            <div className="register-container">
                <h2 className="register-title">Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="register-label">
                            Name
                        </label>
                        <input
                            className="register-input"
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="register-label">
                            Email address
                        </label>
                        <input
                            className="register-input"
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <CustomInput
                        handlePasswordChange={handlePasswordChange}
                        password={password} handleTogglePass={handleTogglePass}
                        togglePassword={togglePassword}/>
                    <div className="form-group">
                        <label className="register-label">User Type</label>
                        <div>
                            <input
                                type="checkbox"
                                id="admin"
                                checked={isAdmin}
                                onChange={handleAdminChange}
                            />
                            <label htmlFor="admin" className="register-checkbox-label">
                                Admin
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="register-button">
                        Register
                    </button>
                    <div onClick={() => navigate('/login')} className='redirect-login'>Go to login</div>
                </form>
                <footer className="register-footer"></footer>
            </div>
        </div>
    );
};

export default Register;
