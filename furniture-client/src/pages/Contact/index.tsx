import React from 'react';

import Header from '../../components/header';
import Footer from '../../components/footer';
import ContactUs from '../../components/contact-us/ContactUs';
import { ContactUsBox } from '../../styles/Contact.styles';


const Contact: React.FC = () => {
    return (
        <>
            <ContactUsBox>
                <Header />
                <ContactUs />
            </ContactUsBox>
            <Footer />
        </>
    );
};

export default Contact;