import React from 'react';
import { Button, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { PaginationBox } from '../../styles/ContactInfo.styles';
import { IPaginationProps } from '../../types/props.interface';


const Pagination: React.FC<IPaginationProps> =
    ({ currentPage, totalPages, onPrev, onNext, disabledPrev, disabledNext }) => {
    return (
        <PaginationBox>
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
        </PaginationBox>
    );
};

export default Pagination;
