import { createTheme } from '@mui/material';


const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#E58411',
            dark: '#9f5907',
            light: '#fae8dc',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#E58411',
            light: '#9f5907',
            dark: '#d89143',
            contrastText: '#ffffff',
        },
        text: {
            primary: '#ffffff',
            secondary: '#000000',
            tertiary: '#E58411',
            defaultBtn: '#666',
        },
        background: {
            default: '#ffffff',
            container: '#fff',
            group: '#989696',
            card: 'rgba(128, 128, 128, 0.8)',
            btnHover: '#f1f0f0',
            footer: 'rgba(35, 37, 40)',
        },
        error: {
            main: '#d32f2f',
            light: '#db5858',
            dark: '#932020',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#ed6c02',
            light: '#f08934',
            dark: '#a54b01',
        },
        success: {
            main: '#2b792f',
            light: '#559358',
            dark: '#1e5420',
            contrastText: '#ffffff',
        },
    },
    typography: {
        fontFamily: `'Gilroy', 'PT Sans', sans-serif`,
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,

        h1: {
            fontSize: 48,
            fontWeight: 700,
        },
        h2: {
            fontSize: 40,
            fontWeight: 700,
        },
        h3: {
            fontSize: 34,
            fontWeight: 700,
        },
        h4: {
            fontSize: 24,
            fontWeight: 700,
        },
        h5: {
            fontSize: 20,
            fontWeight: 700,
        },
        h6: {
            fontSize: 16,
            fontWeight: 700,
        },
        subtitle1: {
            fontSize: 18,
            fontWeight: 600,
        },
        subtitle2: {
            fontSize: 16,
            fontWeight: 400,
        },
        body1: {
            fontSize: 16,
            fontWeight: 400,
        },
        body2: {
            fontSize: 14,
            fontWeight: 400,
        },
        button: {
            fontWeight: 700,
            textTransform: 'none',
        },
        caption: {
            fontSize: 12,
            fontWeight: 400,
        },
        overline: {
            fontSize: 10,
            fontWeight: 400,
        },
    },
});

export default theme;