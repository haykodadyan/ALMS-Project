import React, {useEffect, useState} from 'react';
import './Login.css';
import AuthService from "../../auth/Auth";
import {useNavigate} from "react-router";
import CustomInput from "../../components/custom-input/CustomInput";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [togglePassword, setTogglePassword] = useState(false)
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password){
            alert('Fill All Inputs')
            return
        }
        AuthService.login(email, password)
            .then(() => navigate('/'))
    };

    const handleTogglePass = (e) => {
        setTogglePassword(!togglePassword)
    }

    useEffect(() => {
        if(AuthService.getIsAuthenticated()){
            navigate('/')
        }
    }, [navigate]);

    return (
        <div className='login-wrapper'>
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="login-label">Email address</label>
                        <input
                            className="login-input"
                            type="text"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <CustomInput
                        handlePasswordChange={handlePasswordChange}
                        password={password} handleTogglePass={handleTogglePass}
                        togglePassword={togglePassword}/>
                    <button type="submit" className="login-button">Submit</button>
                    <div className='redirect-login' onClick={() => navigate('/register')}>
                        Go to registration
                    </div>
                </form>
                <footer className="login-footer">
                </footer>
            </div>
        </div>
    );
};

export default LoginForm;
