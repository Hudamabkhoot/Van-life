import React from "react"
import bgImg from "../assets/images/about-hero.jpg"
import { Link } from "react-router-dom"
import styles from "../css modules/About.module.css";
 
export default function About() {
    return (
        <div className={styles.aboutContainer}>
            <div className={styles.aboutHeroImage}></div>
            <div className={styles.aboutPageContent}>
                <h1 className={styles.welcome}>Welcome to Van Life. <br /> Your Portal to Freedom on Wheels.</h1>
                <p>Why settle for the cramped confines of a sedan when you can embrace the freedom of the open road in a spacious van? At Van Life, we're all about amplifying your journey, one rental at a time.</p>
                <p>Our mission is clear: to elevate your road trip experience by providing access to top-notch travel van rentals. Each van in our fleet undergoes thorough recertification, ensuring your travels proceed smoothly and safely. And yes, if you need it, hitching a trailer is an option, though it comes with an extra cost—yet the memories you'll create are truly invaluable.</p>
                <p>Behind Van Life stands a team of passionate van life enthusiasts who've experienced firsthand the transformative joy of life on four wheels. From bustling cities to remote wilderness, we've explored it all, and now we're here to share our passion and expertise with you.</p>
                <p>Your destination beckons, and your van awaits. Whether it's a quick weekend getaway or an epic cross-country journey, our diverse selection of vans is ready to make it happen.</p>

            </div>
            <div className={styles.aboutPageCta}>
                <h2>Your destination awaits<br />Your van is ready.</h2>
                <Link className={styles.linkButton} to="/vans">Explore our vans</Link>
            </div>
        </div>
    );
}