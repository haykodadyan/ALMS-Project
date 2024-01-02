import React, {useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logo from '../../assets/logo512.png'
import {useNavigate} from "react-router";
import AuthService from "../../auth/Auth";

const pages = ['Home', 'Catalog', 'Logout'];

const Navbar = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if(!AuthService.getIsAuthenticated()){
            navigate('/login')
        }
    }, [navigate]);
    const handleButtonClicks = (page) => {
        if(page === 'Logout'){
            AuthService.logout()
            navigate('/login')
            return;
        }
        navigate(`/${page === 'Home' ? '' : page}`)
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img width={24} style={{margin: '5px'}} src={logo} alt='logo'/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ALMS
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleButtonClicks(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;