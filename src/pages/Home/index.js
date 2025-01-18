import Banner from "components/Banner";
import Title from "components/Title";
import CategorySection from "components/CategorySection";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import { getCategories, getVideos, deleteVideo, addVideo, updateVideo } from "services/api.service";
import AlertDialog from "components/Alerts";

function Home() {
    const [videos, setVideos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchVideosAndCategories();
    }, []);

    const fetchVideosAndCategories = async () => {
        try {
            const [videosData, categoriesData] = await Promise.all([
                getVideos(),
                getCategories(),
            ]);

            setVideos(videosData);
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    };

    const handleDeleteVideo = async (id) => {
        try {
            await deleteVideo(id);
            fetchVideosAndCategories();
            setAlertMessage("El video se ha borrado correctamente");
            setOpenAlert(true);
        } catch (error) {
            console.error("Error al borrar el video:", error);
        }
    };

    const handleUpdateVideo = async (id, data) => {
        try {
            const response = await updateVideo(id, data);
            fetchVideosAndCategories();
            setAlertMessage("El video se ha modificado correctamente");
            setOpenAlert(true);
        } catch (error) {
            console.error("Error al actualizar el video:", error);
        }
    };

    const handleAlertResponse = () => {
        setOpenAlert(false);
    };

    // Organizar videos por categoría
    const categorizedVideos = categories.map((category) => {
        const videosCategory = videos.filter((video) => parseInt(video.category) === parseInt(category.id));
        if (videosCategory.length) {
            return {
                ...category,
                videos: videosCategory
            };
        }
    });

    return (
        <>
            {openAlert ? (
                <AlertDialog
                    open={openAlert}
                    onClose={() => handleAlertResponse()}
                    message={alertMessage}
                />
            ) : null}
            <Banner img="home" />
            <Title>
            </Title>
            <section className={styles.container}>
                {categorizedVideos.map((category) => {
                    if (category) {
                        return <CategorySection
                            key={category.id}
                            category={category}
                            videos={category.videos}
                            onDelete={handleDeleteVideo}
                            onUpdate={handleUpdateVideo}
                        />;
                    }
                })}
            </section>
        </>
    )
}

export default Home;