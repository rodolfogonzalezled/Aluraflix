import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import HeaderLink from "../HeaderLink/HeaderLink";
import { Button } from "@mui/material";
import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

function Header() {
    const location = useLocation();
    return (
        <header className={styles.header}>
            <Link to="/">
                <section className={styles.logoContainer}>
                    <img src="img/logo-aluraflix.png" alt="Logo Alura" />
                </section>
            </Link>
            <nav>
                <HeaderLink url="./">
                    <Button variant={location.pathname === '/' ? 'contained' : 'outlined'}>
                        Home
                    </Button>
                </HeaderLink>
                <div className={styles.buttonAdd}>
                    <HeaderLink url="./new-video" >
                        <Button variant={location.pathname === '/new-video' ? 'contained' : 'outlined'} >
                            Nuevo Video
                        </Button>
                    </HeaderLink>
                </div>
                <div className={styles.buttonAddSmall}>
                    <HeaderLink url="./new-video">
                        <Button variant={location.pathname === '/new-video' ? 'contained' : 'outlined'} >
                            <AddIcon />
                        </Button>
                    </HeaderLink>
                </div>
            </nav>
        </header>
    )
}

export default Header;