import { Link } from "react-router-dom"
import styles from "./Header.module.css"
import logo from "./logo-alura.png"
import HeaderLink from "../HeaderLink/HeaderLink"

function Header(){
    return(
        <header className={styles.header}>
            <Link to="/">
                <section className={styles.logoContainer}>
                    <img src={logo} alt="Logo Alura"/>
                </section>
            </Link>
            <nav>  
                <HeaderLink url="./">
                    Home
                </HeaderLink>
                <HeaderLink url="./NuevoVideo">
                   Nuevo Video
                </HeaderLink>
            </nav>
        </header>
    )
}

export default Header