import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AuthService from '../../auth/Auth';
import Book from './book/Book';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Navbar from '../../components/navbar/Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import './Catalog.css';

const Catalog = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:9999/api/book?page=${currentPage}`);
                const parsed = await response.json();
                setBooks(parsed.data.books);
                setTotalPages(parsed.data.totalPages);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (!AuthService.getIsAuthenticated()) {
            navigate('/login');
        } else {
            fetchBooks();
        }
    }, [currentPage, navigate]);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="catalog_wrapper">
            <Navbar handleLogout={handleLogout} />
            <h1 className="title">Catalog of Books</h1>
            {loading ? (
                <div className='catalog_loading_wrapper'>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <Book books={books} />
                    <Stack sx={{ margin: '20px 0' }} spacing={2}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            size="large"
                            variant="primary"
                        />
                    </Stack>
                </>
            )}
        </div>
    );
};

export default Catalog;
