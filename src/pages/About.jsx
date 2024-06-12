import React, { Suspense, useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import styles from "../css modules/About.module.css";
import Join from '../assets/images/joinUs.jpg'

export default function About() {

    return (
        <div className={styles.aboutContainer}>
         <div className={styles.aboutBackground}></div>
            <div className={styles.aboutPageContent}>
                <h1 className={styles.welcome}>Welcome to Van Life <br /> <span>Your Portal to Freedom on Wheels</span></h1>
                <section className={styles.aboutUs}>
                    <h2>About us</h2>
                    <p>At Van Life, we're passionate about enhancing your road trip experience by providing easy access to top-notch travel van rentals. Whether you're planning a weekend getaway or a cross-country adventure, we've got you covered.</p>
                    <p>Behind Van Life stands a team of passionate van life enthusiasts who've experienced firsthand the transformative joy of life on four wheels. From bustling cities to remote wilderness, we've explored it all, and now we're here to share our passion and expertise with you.</p>
                </section>
                <section className={styles.mission}>
                    <div>
                        <img src={Join} />
                    </div>
                    <div>
                    <h2>Our Mission</h2>
                    <p>To elevate your road trip experience by providing access to top-notch travel van rentals. Each van in our fleet undergoes thorough recertification, ensuring your travels proceed smoothly and safely.</p>
                    <p>Behind Van Life stands a team of passionate van life enthusiasts who've experienced firsthand the transformative joy of life on four wheels. From bustling cities to remote wilderness, we've explored it all, and now we're here to share our passion and expertise with you.</p>
                    </div>
                </section>
            </div>
            <div className={styles.aboutPageConainer}>
                <h2>Your destination awaits<br />Your van is ready.</h2>
                <Link className={styles.linkButton} to="/vans">Explore our vans</Link>
            </div>
        </div>
    );
}