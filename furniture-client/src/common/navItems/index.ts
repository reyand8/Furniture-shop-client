import { INavItem } from '../../types/common.interface';
import { PATHS } from '../../routes/paths';

const {
    HOME, CATALOG, ABOUT, CONTACT
} = PATHS;

export const navItems: INavItem[] = [
    { label: 'Home', path: HOME },
    { label: 'Catalog', path: CATALOG },
    { label: 'Contact', path: CONTACT },
    { label: 'About Us', path: ABOUT },
];