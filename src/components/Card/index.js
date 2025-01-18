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
import Form from "components/Form";
import AlertDialog from "components/Alerts";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Card({ color, video, onDelete, onUpdate }) {
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    const [open, setOpen] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [showUpdateVideo, setUpdateVideo] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const handleShowVideo = () => {
        setOpen(true);
        setShowVideo(true);
    };

    const handleClose = () => {
        setOpen(false);
        setShowVideo(false);
        setUpdateVideo(false);
    };

    const handleDelete = () => {
        setOpenAlert(true);
    };

    const handleUpdateVideo = () => {
        setOpen(true);
        setUpdateVideo(true);
    };

    const handleAlertResponse = (response) => {
        setOpenAlert(false);
        if (response === 'accept') {
            onDelete(video.id);
        }
    };

    const obj = {
        boxShadow: "0px 0px 15px " + hexToRgba(color, 0.8)
    };

    return (
        <>
            {openAlert ? (
                <AlertDialog
                    open={openAlert}
                    onClose={(response) => handleAlertResponse(response)}
                    message={'Esta seguro que desea borrar el video seleccionado?'}
                    buttonAcept={'Borrar'}
                />
            ) : null}

            <div className={styles.container} style={obj}>
                <img src={video.image} alt={video.title} className={styles.capa} onClick={handleShowVideo} />
                <div className={styles.iconOverlay}>
                    <IconButton>
                        <PlayArrowIcon sx={{ fontSize: 64, color: 'white' }} />
                    </IconButton>
                </div>
                <div className={styles.icons}>
                    <h3>{video.title}</h3>
                </div>
                <div className={styles.icons}>
                    <div className={styles.icon} onClick={handleDelete}>
                        <DeleteIcon />Borrar
                    </div>
                    <div className={styles.icon} onClick={handleUpdateVideo}>
                        <EditIcon />Editar
                    </div>
                </div>
            </div>

            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth={showVideo ? 'lg' : 'sm'}
                PaperProps={{
                    style: {
                        minHeight: showVideo ? '90%' : 'auto',
                        backgroundColor: '#191919',
                        borderColor: 'white',
                        border: 'solid',
                        borderWidth: '5px'
                    }
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2, color: 'white' }} id="customized-dialog-title">
                    {showUpdateVideo ? 'EDITAR CARD' : video.title}
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
                    {showVideo ? (
                        <iframe src={video.video}></iframe>
                    ) : showUpdateVideo ? (
                        <Form data={video} onUpdate={onUpdate} onClose={handleClose}></Form>
                    ) : null}
                </DialogContent>
            </Dialog>
        </>
    );
}
export default Card;
