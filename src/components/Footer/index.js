import styles from "./Footer.module.css"
import logo from "../Header/logo-alura.png"

function Footer() {
    return (<footer className={styles.Footer}>
        <img src={logo} alt="AluraFlix" />
        <h4>Desarrollado por Rodolfo Gonzalez</h4>
    </footer>)

}
export default Footer