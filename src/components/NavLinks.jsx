import React, { useContext } from "react"
import { NavLink, Link, useNavigate} from "react-router-dom"
import Avatar from "../assets/images/avatar-icon.svg"
import Logout from "../assets/images/logout.svg"
import { logOutUser } from '../firebase'
import AuthContext from './AuthContext'

export default function NavLinks() {
    const navigate = useNavigate()

    const handleLogOut = async () => {
        logOutUser()
        navigate('/login')
        console.log ('logged out')
    }
    const {user} = useContext(AuthContext)
    
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }


    return (
        <section  className="NavLinks">
            <nav className="navContainer">
                <NavLink
                    to="/host"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink
                    to="/about"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
                <NavLink
                    to="/vans"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>
                <Link to="register" className="login-link">
                    <img
                        src={Avatar}
                        className="user-icon"
                    />
                </Link>
                {(user) &&
                <button onClick={handleLogOut} className="logout-btn"> 
                <img
                    src={Logout}
                    className="logout-icon"
                    />
                 </button>
                }
            </nav>
        </section>
    )
            }