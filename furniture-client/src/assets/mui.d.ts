import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypeText {
        tertiary: string;
        defaultBtn: string;
    }
}

declare module '@mui/material/styles' {
    interface TypeBackground {
        card: string;
        container: string;
        group: string;
        btnHover: string;
        footer: string;
    }
}
