import { addVideo } from "services/api.service";
import Form from "components/Form";
import styles from './NewVideo.module.css';
import AlertDialog from "components/Alerts";
import { useState } from "react";

function NewVideo() {
    const [openAlert, setOpenAlert] = useState(false);
    const handleAddVideo = async (data) => {
        try {
            const response = await addVideo(data);
            setOpenAlert(true);
        } catch (error) {
            console.error("Error al crear el video:", error);
        }
    };

    const handleAlertResponse = () => {
        setOpenAlert(false);
    };

    return (
        <>
            {openAlert ? (
                <AlertDialog
                    open={openAlert}
                    onClose={() => handleAlertResponse()}
                    message={'El video se ha agregado correctamente'}
                />
            ) : null}
            <div className={styles.newVideo}>
                <div className={styles.titleVideo}>
                    <h1>NUEVO VIDEO</h1>
                    <p>COMPLETE EL FORMULARIO PARA CREAR UNA NUEVA TARJETA DE VIDEO</p>
                </div>
                <div className={styles.formVideo}>
                    <Form onAdd={handleAddVideo} layout={'horizontal'} ></Form>
                </div>
            </div>
        </>
    )
}

export default NewVideo;