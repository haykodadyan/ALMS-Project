import './Home.css';
import React, { useEffect } from 'react';
import AuthService from '../../auth/Auth';
import { useNavigate } from 'react-router';
import Navbar from '../../components/navbar/Navbar';


const Home = () => {



    const navigate = useNavigate();

    useEffect(() => {
        if (!AuthService.getIsAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);


    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };
    return (
        <div className='home_wrapper'>
            <Navbar handleLogout={handleLogout} />
            <h1 className='title'>Our Library Collection of Books</h1>
            <h1 className='title'>This is HOME component, if you try hard enough there is some tiny chance to see it in your mind stupid cunt</h1>
        </div>
    );
};

export default Home;
