import { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BusinessIcon from '@mui/icons-material/Business';

import {
    ContactInfoAll,
    ContactInfoBox,
    ContactInfoDataBox,
    ContactInfoDetails,
    ContactInfoItem,
    ContactInfoItemData,
    ContactInfoItemTitle,
    ContactInfoTitle,
    MapBox
} from '../../styles/Contact.styles';


const ContactUs = () => {
    const apiMapKey: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const [markerLocation, setMarkerLocation] =
        useState<{ lat: number, lng: number }>({
            lat:  40.416775,
            lng: -3.703790,
        });

    return (
        <ContactInfoBox>
            <ContactInfoTitle>Contact Info</ContactInfoTitle>
            <ContactInfoAll>
                { apiMapKey && (
                    <MapBox>
                        <APIProvider apiKey={apiMapKey}>
                            <Map
                                defaultZoom={13}
                                defaultCenter={markerLocation}
                                gestureHandling={"greedy"}
                                disableDefaultUI>
                                <Marker position={markerLocation}/>
                            </Map>
                        </APIProvider>
                    </MapBox>
                )}
                <ContactInfoDetails>
                    <ContactInfoItem>
                        <ContactInfoItemTitle>Address</ContactInfoItemTitle>
                        <ContactInfoDataBox>
                            <BusinessIcon fontSize={"medium"} />
                            <ContactInfoItemData>
                                Calle de la Herramienta, 24, Local B
                                28045 Madrid, España
                            </ContactInfoItemData>
                        </ContactInfoDataBox>
                    </ContactInfoItem>
                    <ContactInfoItem>
                        <ContactInfoItemTitle>Phone Number</ContactInfoItemTitle>
                        <ContactInfoDataBox>
                            <LocalPhoneIcon fontSize={"medium"} />
                            <ContactInfoItemData>+34 444 444 444</ContactInfoItemData>
                        </ContactInfoDataBox>
                    </ContactInfoItem>
                    <ContactInfoItem>
                        <ContactInfoItemTitle>E-mail</ContactInfoItemTitle>
                        <ContactInfoDataBox>
                            <EmailIcon fontSize={"medium"} />
                            <ContactInfoItemData>client.support@furni.com</ContactInfoItemData>
                        </ContactInfoDataBox>
                    </ContactInfoItem>
                </ContactInfoDetails>
            </ContactInfoAll>
        </ContactInfoBox>
    )
}

export default ContactUs;