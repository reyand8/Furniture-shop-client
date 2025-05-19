import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Collapse } from '@mui/material';

import {
    ContactInfoAddBox,
    OpenContactInfoFormBtn
} from '../../../styles/ContactInfo.styles';
import ContactInfoCreate from '../contact-info-create';
import theme from '../../../assets/theme';

const iconSx = {
    color: theme.palette.primary.contrastText,
    fontSize: '48px'
};

const ContactInfoAdd: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleToggleForm = () => setIsFormOpen(prev => !prev);

    return (
        <ContactInfoAddBox>
            <OpenContactInfoFormBtn onClick={handleToggleForm}>
                {
                    isFormOpen ?
                        <CloseIcon sx={iconSx} />
                        :
                        <AddIcon sx={iconSx} />
                }
            </OpenContactInfoFormBtn>
            <Collapse in={isFormOpen} timeout={{ enter: 600, exit: 500 }} unmountOnExit>
               <ContactInfoCreate />
            </Collapse>
        </ContactInfoAddBox>
    )
}

export default ContactInfoAdd;