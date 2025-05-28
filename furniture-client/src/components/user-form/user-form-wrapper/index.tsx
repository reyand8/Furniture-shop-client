import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Collapse } from '@mui/material';

import { IAddFormWrapperProps } from '../../../types/props.interface';
import {
    AddFormWrapperBox,
    AddFormWrapperOpenBtn
} from '../../../styles/AddFormWrapper.styles';
import { iconAddForm } from '../../../common/common-items';


const AddFormWrapper: React.FC<IAddFormWrapperProps> = ({ children, disabled = false }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleToggleForm = (): void => setIsFormOpen((prev: boolean) => !prev);

    return (
        <AddFormWrapperBox>
            <AddFormWrapperOpenBtn disabled={disabled} onClick={handleToggleForm}>
                {isFormOpen ? <CloseIcon sx={iconAddForm} /> : <AddIcon sx={iconAddForm} />}
            </AddFormWrapperOpenBtn>
            <Collapse in={isFormOpen} timeout={{ enter: 600, exit: 500 }} unmountOnExit>
                {children}
            </Collapse>
        </AddFormWrapperBox>
    );
};

export default AddFormWrapper;