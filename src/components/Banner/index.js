import styles from "./Banner.module.css";
import { Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Banner({ img, color }) {
    return (
        <div
            className={styles.capa}
            style={{ backgroundImage: `url("/img/banner-${img}.png")` }}
        >
            <div className={styles.gradient}>
                <div className={styles.banner}>
                    <div className={styles.bannerText}>
                        <h1>FRONT END</h1>
                        <h3>Challenge React</h3>
                        <p>Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.</p>
                    </div>
                    <div className={styles.bannerImg}>
                        <Box
                            component="a"
                            href="https://www.youtube.com/embed/ov7vA5HFe6w"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: 'block',
                                position: 'relative',
                                borderRadius: 2,
                                overflow: 'hidden',
                                border: '2px solid rgba(30, 20, 212, 0.945)',
                                boxShadow: '12px 20px 40px rgba(109, 103, 217, 0.5)',
                                textDecoration: 'none',
                                opacity: 1
                            }}
                        >
                            <Box
                                component="img"
                                src="https://img.youtube.com/vi/ov7vA5HFe6w/maxresdefault.jpg"
                                alt="Challenge React"
                                sx={{
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    opacity: 0,
                                    transition: 'opacity 0.3s',
                                    '&:hover': {
                                        opacity: 1,
                                    },
                                }}
                            >
                                <PlayArrowIcon sx={{ fontSize: 64, color: 'white' }} />
                            </Box>
                        </Box>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;