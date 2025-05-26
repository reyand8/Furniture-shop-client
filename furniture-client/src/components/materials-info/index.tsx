import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

import materialsInfoOne from '../../assets/img/materialsInfoOne.png'
import materialsInfoTwo from '../../assets/img/materialsInfoTwo.png'
import materialsInfoThree from '../../assets/img/materialsInfoThree.png'
import theme from '../../assets/theme';
import {
    ChooseUsImagesBox,
    ChooseUsLeftImg,
    ChooseUsRightImg,
    MaterialsInfoBox,
    MaterialsInfoDescriptionBox,
    MaterialsInfoText,
    MaterialsInfoTitle,
    MoreInfoBox
} from '../../styles/MaterialsInfo.styles';
import { PATHS } from '../../routes/paths';


const MaterialsInfo: React.FC = () => {
    return (
        <MaterialsInfoBox>
            <MaterialsInfoDescriptionBox>
                <Typography
                    variant={"subtitle1"}
                    color={theme.palette.primary.main}>
                    Materials
                </Typography>
                <MaterialsInfoTitle>
                    Very serious materials for making furniture
                </MaterialsInfoTitle>
                <MaterialsInfoText variant={"body2"}>
                    Because panto was very serious about designing furniture
                    for our environment, using a very expensive and famous
                    capital but at a relatively low price
                </MaterialsInfoText>
                <MoreInfoBox>
                    <Link to={PATHS.ABOUT} style={{textDecoration: 'none'}}>
                        <Typography variant={"subtitle2"} color={theme.palette.primary.main}>
                            More Info
                        </Typography>
                    </Link>
                    <TrendingFlatIcon sx={{color: theme.palette.primary.main, fontSize: '18px'}}/>
                </MoreInfoBox>
            </MaterialsInfoDescriptionBox>
            <ChooseUsImagesBox>
                <ChooseUsLeftImg>
                    <Box
                        component="img"
                        src={materialsInfoOne}
                        alt={materialsInfoOne}
                        sx={{ width: '100%', borderRadius: '10px' }}
                    />
                    <Box
                        component="img"
                        src={materialsInfoThree}
                        alt={materialsInfoThree}
                        sx={{ width: '100%', borderRadius: '10px' }}
                    />
                </ChooseUsLeftImg>
                <ChooseUsRightImg>
                    <Box
                        component="img"
                        src={materialsInfoTwo}
                        alt={materialsInfoTwo}
                        sx={{
                            width: '90%',
                            borderRadius: '40px',
                            boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.3)'
                        }}
                    />
                </ChooseUsRightImg>
            </ChooseUsImagesBox>
        </MaterialsInfoBox>
    )
}

export default MaterialsInfo;