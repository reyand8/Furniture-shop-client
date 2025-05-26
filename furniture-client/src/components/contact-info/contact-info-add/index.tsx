import React from 'react';

import ContactInfoCreate from '../contact-info-create';
import AddFormWrapper from '../../add-form-wrapper';


const ContactInfoAdd: React.FC = () => {
    return (
        <AddFormWrapper>
            <ContactInfoCreate />
        </AddFormWrapper>
    );
};

export default ContactInfoAdd;