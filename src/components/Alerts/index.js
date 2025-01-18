import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import React from 'react';

function AlertDialog({ open, onClose, message, buttonAcept }) {

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => onClose('cancel')}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    {buttonAcept ? (
                        <Button onClick={() => onClose('accept')} color="primary">
                            {buttonAcept}
                        </Button>
                    ) : null}
                    <Button onClick={() => onClose('cancel')} color="secondary" autoFocus>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;