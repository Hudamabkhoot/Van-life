import React from "react"
import { NavLink, Outlet } from "react-router-dom"
import styles from '../css modules/Host/HostLayout.module.css'
import { HostProvider } from '../components/HostContext'

export default function HostLayout() {
    const activeStyles = {
        fontWeight: "800",
        color: "#161616"
    }

    return (
        <HostProvider>
        <section >
            <nav className={styles.hostNav}>
                <NavLink
                    to="."
                    end
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="income"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Income
                </NavLink>
                
                <NavLink
                    to="vans"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>

                <NavLink
                    to="reviews"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Reviews
                </NavLink>
                <NavLink
                    to="settings"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Settings
                </NavLink>
            </nav>
            <Outlet />
        </section>
        </HostProvider>
    )
}