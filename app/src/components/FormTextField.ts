import * as React from 'react';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

const FormTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    marginTop: 1,
    width: 250
}));

export default FormTextField;