import React from "react"
import { Link } from "react-router-dom"
import styles from '../css modules/Home.module.css'

export default function Home() {
    return (
        <div className={styles.homeContainer}>
            <h1>Welcome to Van Life Adventures!</h1>
            <p>You've got the travel plans, and we've got the travel vans.</p>
            <Link to="vans">Find your van</Link>
        </div>
    )
};