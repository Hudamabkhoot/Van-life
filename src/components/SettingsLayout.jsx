import React from "react"
import { NavLink, Outlet } from 'react-router-dom'
import styles from '../css modules/Host/Settings/SettingsLayout.module.css'

export default function SettingsLayout() {

    const activeStyles = {
        fontWeight: "bold",
        color: "#161616",
        alignItems: 'center',
        gap: '15px'
    }


    return (
        <section className={styles.hostLayout}>
            <div className={styles.content}>
            <nav className={styles.hostNav}>
                <NavLink
                    to="."
                    end
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Profile
                </NavLink>

                <NavLink
                    to="account"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Account
                </NavLink>
            </nav>
            <Outlet />
            </div>
        </section>
    )
}