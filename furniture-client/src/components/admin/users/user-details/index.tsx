import React from 'react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle
} from '@mui/material';

import theme from '../../../../assets/theme';
import {
    DialogDetailsMain,
    DialogDetailsSection,
    DialogInfo,
    DialogInfoText,
    DialogInfoTitle
} from '../../../../styles/DialogDetails.styles';
import { IUserDetailsProps } from '../../../../types/props.interface';


/**
 * UserDetails component shows detailed information about a user in a dialog.
 *
 * @param {IUserDetailsProps} props - Component props.
 * @param {object} props.item - User object with details to display.
 * @param {boolean} props.isOpen - Boolean flag controlling dialog visibility.
 * @param {function} props.setIsOpen - Function to change the dialog visibility state.
 */
const UserDetails: React.FC<IUserDetailsProps> = ({ item, isOpen, setIsOpen }: IUserDetailsProps) => {

    /**
     * Closes the dialog by setting isOpen state to false.
     */
    const handleClose = (): void => {
        setIsOpen(false);
    };

    const { firstName, lastName, email, role, isActive } = item;

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle color={theme.palette.text.secondary}>User Details</DialogTitle>
            <DialogContent>
                <DialogDetailsMain>
                    <DialogDetailsSection>
                        <DialogInfo>
                            <DialogInfoTitle>First Name</DialogInfoTitle>
                            <DialogInfoText>{firstName}</DialogInfoText>
                        </DialogInfo>
                        <DialogInfo>
                            <DialogInfoTitle>Last Name</DialogInfoTitle>
                            <DialogInfoText>{lastName}</DialogInfoText>
                        </DialogInfo>
                        <DialogInfo>
                            <DialogInfoTitle>Email</DialogInfoTitle>
                            <DialogInfoText>{email}</DialogInfoText>
                        </DialogInfo>
                        <DialogInfo>
                            <DialogInfoTitle>Role</DialogInfoTitle>
                            <DialogInfoText>{role}</DialogInfoText>
                        </DialogInfo>
                        <DialogInfo>
                            <DialogInfoTitle>User Status</DialogInfoTitle>
                            <DialogInfoText>{isActive ? 'Active' : 'Inactive'}</DialogInfoText>
                        </DialogInfo>
                    </DialogDetailsSection>
                </DialogDetailsMain>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDetails;