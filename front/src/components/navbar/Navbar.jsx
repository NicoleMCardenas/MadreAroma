import avatar from "../../assets/avatar.png"
import logo from "../../assets/logo.png"
import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
    <div className={styles.container}>
    <div className={styles.logoSection}>
        <img src={logo} alt="logo"/>
    </div>
    <div className={styles.linksSection}>
    <span>HOME</span>
    <span>RESERVA</span>
    <span>ABOUT</span>
    </div>
    <div className={styles.avatarSection}>
        <img src={avatar} alt="avatar"/>
    </div>
    </div>
    );
};
export default Navbar;