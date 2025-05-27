import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    FormControl, RadioGroup,
    FormControlLabel, Radio
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

import { EPaymentMethod } from '../../../types/order.interface';
import theme from '../../../assets/theme';
import { SelectOrderTitle } from '../../../styles/Order.styles';
import { AppDispatch } from '../../../store/store';
import { setPaymentMethod } from '../../../store/slice/order/order.slice';
import { paymentLabels } from "../../../common/common-items";


const OrderPaymentMethod: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedMethod, setSelectedMethod] = useState<EPaymentMethod | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedMethod(event.target.value as EPaymentMethod);
        dispatch(setPaymentMethod(event.target.value as EPaymentMethod))
    };

    return (
        <FormControl component="fieldset">
            <SelectOrderTitle isSelected={!!selectedMethod}>
                Payment Method
                {!!selectedMethod && <DoneIcon  color="success" />}
            </SelectOrderTitle>
            <RadioGroup
                name="paymentMethod"
                value={selectedMethod ?? ''}
                onChange={handleChange}
            >
                {Object.values(EPaymentMethod).map((method) => (
                    <FormControlLabel
                        key={method}
                        value={method}
                        control={<Radio />}
                        sx={{color: theme.palette.text.secondary}}
                        label={paymentLabels[method]}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default OrderPaymentMethod;