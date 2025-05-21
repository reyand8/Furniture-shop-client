import {
    Button, Box,
    styled, Typography
} from '@mui/material';
import Slider from 'react-slick';

import theme from '../assets/theme';
import { IStyledButtonProps } from "../types/props.interface";


export const BestSellerBox = styled(Box)({
    backgroundColor: theme.palette.background.container,
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
        paddingBottom: '0',
    },
});

export const BestSellerTitle = styled(Typography)(({ theme }) => ({
    fontSize: '40px',
    fontWeight: 700,
    color: theme.palette.text.secondary,
    textAlign: 'center',
    padding: theme.spacing(6, 0),
}));

export const StyledSliderBox = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: '30px auto',
    [theme.breakpoints.down('md')]: {
        width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
        width: '50%',
    },
}));

export const StyledSlider = styled(Slider)(({ theme }) => ({
    gap: '30px',
    ".slick-prev:before, .slick-next:before": {
        color: theme.palette.background.card,
        fontSize: '40px',
        paddingRight: '20px',
    },
}));

export const TypesBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0 60px 0',
});

export const StyledButtonGroup = styled(Box)({
    backgroundColor: theme.palette.background.group,
    overflow: 'hidden',
    borderRadius: '30px',
    padding: '9px 16px 9px 16px',
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
    },
});

export const StyledButton = styled(Button)<IStyledButtonProps>(({ isSelected }) => ({
    fontSize: '18px',
    fontWeight: 400,
    textTransform: 'none',
    padding: '10px 20px',
    backgroundColor: isSelected ? theme.palette.background.container : theme.palette.background.group,
    color: isSelected ? theme.palette.text.secondary : theme.palette.text.defaultBtn,
    borderRadius: '21px',
    "&:hover": {
        backgroundColor: theme.palette.background.btnHover,
    },
}));