import { styled, Box, Typography } from '@mui/material';


export const CarouselItemBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    margin: `0 ${theme.spacing(3.75)}`,
    paddingBottom: theme.spacing(10),
    cursor: 'pointer',
    overflow: 'visible',
    borderRadius: '10px',
    '&::before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '0%',
        background: theme.palette.background.group,
        zIndex: -1,
        borderRadius: '10px',
        transition: '0.3s all ease',
        overflow: 'visible',
    },
    '&:hover::before': {
        height: '100%',
    },
    '&:hover .carousel-image': {
        top: theme.spacing(-1.25),
    },
    '&:hover .icon-cross': {
        opacity: 1,
        visibility: 'visible',
    },
}));

export const CarouselImageBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    top: 0,
    marginBottom: '30px',
    transition: '0.3s all ease',
    maxWidth: '300px',
    width: '100%',
    maxHeight: '290px',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '224px',
        maxHeight: '188px',
        margin: '30px auto',
    },
}));

export const CarouselItemName = styled(Typography)(({ theme }) => ({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    maxWidth: '100%',
    color: theme.palette.text.secondary,
}));

export const IconCrossBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: '45px',
    height: '45px',
    background: theme.palette.text.defaultBtn,
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '50%',
    opacity: 0,
    visibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary,
    transition: '0.3s all ease',
}));