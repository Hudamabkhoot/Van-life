import React from "react"
import styles from '../css modules/Footer.module.css';
import { Link } from "react-router-dom"
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Van from "../assets/images/footer-logo.png"

export default function Footer() {
    const copyright = String.fromCodePoint(0x00A9);

    return (
        <footer>    
            <div className={styles.footerComponent}>
                <div className={styles.footerTop}>
                    <div>
                    <Link to="/">
                        <img src={Van} className={styles.logo}/>
                        <p>Van Life</p>
                    </Link>
                    </div>
                    <div className={styles.details}>
                    <Link
                        to="/about">
                        About
                    </Link>
                    <Link
                        to="/vans">
                        Vans
                    </Link>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <div className={styles.copyright}>
                        <a>{`${copyright} 2024 Van Life`}</a>
                </div>
                <div className={styles.socials}>
                <Link to="https://github.com/Hudamabkhoot"><FaGithub className={styles.icon}/></Link>
                <Link to="https://www.linkedin.com/in/huda-mabkhoot/"><FaLinkedin className={styles.icon}/></Link>
                </div>
            </div>
        </footer>
    )
}