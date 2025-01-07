import Banner from "components/Banner";
import Header from "components/Header/Header";
import Titulo from "components/Titulo";
import CategorySection from "components/CategorySection";
import Footer from "components/Footer/index";
import styles from "components/Container/Container.module.css";
import { useState, useEffect } from "react";
import { getCategories, getVideos, deleteVideo } from "services/api.service";

function Home() {
    const [videos, setVideos] = useState([]);
    const [categories, setCategories] = useState([]);

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
        } catch (error) {
            console.error("Error al borrar el video:", error);
        }
    };
    // Organizar videos por categoría
    const categorizedVideos = categories.map((category) => {
        const videosCategory = videos.filter((video) => video.category === parseInt(category.id));
        if (videosCategory.length) {
            return {
                ...category,
                videos: videosCategory
            };
        } 
    });


    return (
        <>
            <Header></Header>
            <Banner img="home" color="#154580" />
            <Titulo>
            </Titulo>
            <section className={styles.container}>
                {categorizedVideos.map((category) => {
                    if (category) {
                        return <CategorySection
                        key={category.id}
                        category={category}
                        videos={category.videos}
                        onDelete={handleDeleteVideo}
                    />;
                    }
                })}
            </section>
            <Footer />
        </>
    )
}

export default Home;