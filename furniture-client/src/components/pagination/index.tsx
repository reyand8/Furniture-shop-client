import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface IPaginationProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    disabledPrev?: boolean;
    disabledNext?: boolean;
}

const Pagination: React.FC<IPaginationProps> =
    ({ currentPage, totalPages, onPrev, onNext, disabledPrev, disabledNext }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
                onClick={onPrev}
                disabled={disabledPrev || currentPage === 1}
                variant="text"
                startIcon={<ArrowBackIosIcon />}
            >
                Previous
            </Button>

            <Typography variant="body2" color="textSecondary">
                Page {currentPage} of {totalPages}
            </Typography>

            <Button
                onClick={onNext}
                disabled={disabledNext || currentPage === totalPages}
                variant="text"
                endIcon={<ArrowForwardIosIcon />}
            >
                Next
            </Button>
        </Box>
    );
};

export default Pagination;
