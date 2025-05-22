import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';

import theme from '../../assets/theme';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { NotFoundBox, NotFoundItemBox, NotFoundText } from '../../styles/NotFound.styles';
import { HeaderBox } from '../../styles/Header.styles';


const NotFound: React.FC = () => {
    return (
        <>
            <HeaderBox>
                <Header />
            </HeaderBox>
            <NotFoundBox>
                <NotFoundItemBox>
                    <ErrorIcon sx={{fontSize: 74, my: 7, fill: theme.palette.error.main}}/>
                    <NotFoundText>
                        Not Found
                    </NotFoundText>
                </NotFoundItemBox>
            </NotFoundBox>
            <Footer />
        </>
    );
};

export default NotFound;