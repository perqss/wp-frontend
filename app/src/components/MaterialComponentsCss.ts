import TextField, {TextFieldProps} from '@mui/material/TextField';
import Box, {BoxProps} from '@mui/material/Box';
import Button, {ButtonProps} from '@mui/material/Button'
import Alert, {AlertProps} from '@mui/material/Alert'
import {styled} from '@mui/material/styles';

const FormTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    marginTop: 1,
    width: 250,
}));

const FormBox = styled(Box)<BoxProps>(({ theme }) => ({
    top: '50%',
    left: '50%',
    width: 400,
    p: 2,
    boxShadow: '24',
    bgcolor: 'background.paper',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
}));

const FormButton = styled(Button)<ButtonProps>(({ theme }) => ({
    marginTop: 1, 
    backgroundColor: '#0c2d64',
}));

const ItemInfoButton = styled(Button)<ButtonProps>(({ theme }) => ({
    marginTop: 40, 
    backgroundColor: '#0c2d64',
}))

const StyledAlert = styled(Alert)<AlertProps>(({ theme }) => ({
    width: 250,
    marginTop: 1,
}));

export {FormTextField, FormBox, FormButton, StyledAlert, ItemInfoButton};