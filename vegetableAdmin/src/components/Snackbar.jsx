import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Snackbar1(props) {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <Snackbar open={props.message.open1} className='snackbar'>
                <Alert
                    // onClose={handleClose}
                    severity={props.message.type}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {props.message.msg}
                </Alert>
            </Snackbar>
        </div>
    );
}
