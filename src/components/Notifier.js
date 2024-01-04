import React from 'react';
import useNotificationStore from '../store/NotificationStore';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Slide, Snackbar } from '@mui/material';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function Notifier() {
    const { display, hideNotification, message } = useNotificationStore()

    const closeAction = (
        <React.Fragment>
            <IconButton
                sx={{marginRight: '10px'}}
                size="medium"
                aria-label="close"
                color="inherit"
                onClick={hideNotification}
            >
                <CloseIcon fontSize="medium" />
            </IconButton>
        </React.Fragment>
    );

    return (
            <Snackbar
                sx={{
                    opacity: '60%',
                    margin: '-25px',
                    '& .MuiSnackbarContent-root': {
                        minWidth: '100vw'
                    },
                }}
                open={display}
                onClose={hideNotification}
                autoHideDuration={2500}
                TransitionComponent={TransitionUp}
                message={message}
                key={TransitionUp.name}
                action={closeAction}
            />
    )
}

export default Notifier