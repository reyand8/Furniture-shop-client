import ErrorIcon from '@mui/icons-material/Error';

import theme from '../../../assets/theme';
import { StatusIcon } from '../../../styles/Status.styles';


const ErrorInfo = () => {
    return (
        <StatusIcon>
            <ErrorIcon sx={{fontSize: 60, my: 7, fill: theme.palette.error.main}}  />
        </StatusIcon>
    );
};

export default ErrorInfo;