interface INavItem {
    label: string;
    path: string;
}

export const navItems: INavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Catalog', path: '/shop' },
    { label: 'Contact', path: '/contact' },
    { label: 'About Us', path: '/about' },
];