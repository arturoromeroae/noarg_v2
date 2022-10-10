import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const AlertSuccess = () => {
    return (
        <div>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">This is a success alert — check it out!</Alert>
            </Stack>
        </div>
    )
}

export default AlertSuccess