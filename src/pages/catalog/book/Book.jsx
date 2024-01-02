import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const BookCard = ({ book }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [availabilityToast, setAvailabilityToast] = useState(false);
    const [unavailabilityToast, setUnavailabilityToast] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleCheckAvailability = () => {
        if (book.availability) {
            setAvailabilityToast(true);
            setTimeout(() => {
                setAvailabilityToast(false);
            }, 1500);
        } else {
            setUnavailabilityToast(true);
            setTimeout(() => {
                setUnavailabilityToast(false);
            }, 1500);
        }
    };

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAvailabilityToast(false);
        setUnavailabilityToast(false);
    };

    return (
        <Card variant="outlined"
              sx={{display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 300,
                  minHeight: '300px',
                  margin: 2,
                  borderRadius: '8px' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {book.title}
                </Typography>
                {
                    book.authors &&
                    <Typography variant="h5" component="div">
                        {!book.authors.length ? 'Author Name is Empty' : book.authors.join(', ')}
                    </Typography>
                }
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    ISBN: {book.isbn}
                </Typography>
                {showDetails && (
                    <>
                        <Typography variant="body2">
                            Published Year: {book.published_year || 'Not available'}
                            <br />
                            Category: {book.category && book.category.join(', ')}
                            <br />
                            Location: {book.location && `Shelf: ${book.location.shelf}, Row: ${book.location.row}`}
                            <br />
                        </Typography>
                    </>
                )}
            </CardContent>
            <CardActions>
                <Button onClick={toggleDetails} size="small">Show More</Button>
                <Button onClick={handleCheckAvailability} size="small">Check</Button>
                <Button size="small">Loan</Button>
            </CardActions>
            <Snackbar
                open={availabilityToast}
                autoHideDuration={1500}
                onClose={handleCloseToast}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseToast}
                    severity="success"
                >
                    Book is available!
                </MuiAlert>
            </Snackbar>
            <Snackbar
                open={unavailabilityToast}
                autoHideDuration={1500}
                onClose={handleCloseToast}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseToast}
                    severity="error"
                >
                    Book is not available!
                </MuiAlert>
            </Snackbar>
        </Card>
    );
};

const BookList = ({ books }) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {books.map((book, index) => (
                <BookCard key={index} book={book} />
            ))}
        </Box>
    );
};

export default BookList;
