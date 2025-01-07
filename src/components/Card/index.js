import styles from "./Card.module.css";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import hexToRgba from 'hex-to-rgba';

function Card({ color, id, image, title, video, onDelete }) {
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    const obj = {
        boxShadow: "0px 0px 15px " + hexToRgba(color, 0.8)
    };

    return (
        <>

            <div className={styles.container} style={obj}>
                <img src={image} alt={title} className={styles.capa} onClick={handleClickOpen} />
                <div className={styles.icons}>
                    <div className={styles.icon} onClick={handleDelete}>
                        <DeleteIcon />Borrar
                    </div>
                    <div className={styles.icon} onClick={handleDelete}>
                        <EditIcon />Editar
                    </div>
                </div>
            </div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Modal title
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <iframe width="100%" height="100%" src={video}></iframe>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}
export default Card;
