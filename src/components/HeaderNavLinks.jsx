import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Avatar from "../assets/images/avatar-icon.svg"
import Logout from "../assets/images/logout.svg"
import DefaultUserImg from '../assets/images/DefaultUserImg.svg'
import { logOutUser } from '../firebase/firebase'
import { removeUser } from '../slices/authSlice';
import { AuthContext }  from './AuthContext'
import { useDispatch } from 'react-redux';

export default function HeaderNavLinks() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleLogOut = async (e) => {
        e.preventDefault();
        logOutUser()
        dispatch(removeUser());
        navigate('/')
    }
    const { authUser } = useContext(AuthContext)
    
    const activeStyles = {
        fontWeight: "bold",
        color: "#161616"
    }


    return (
        <section>
        <section className="NavLinks">
            <nav className="HeaderNavContainer">
                <NavLink
                    to="/"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Home
                </NavLink>
                {(authUser) &&
                <NavLink
                    to="/host"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                }
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
                {(!authUser) &&
                <Link to={'/login'} className="login-link">
                    <img
                        src={Avatar}
                        className="user-icon-before"
                    />
                </Link>
                }
                {(authUser) &&
                <Link to={'/host/settings'} className="login-link">
                    <img
                        src={authUser.photoURL == null ? DefaultUserImg : authUser.photoURL}
                        className="user-icon-after"
                    />
                </Link>
                }
                {(authUser) &&
                <button onClick={(e) => handleLogOut(e)} className="logout-btn">
                <img
                    src={Logout}
                    className="logout-icon"
                    />
                 </button>
                }
            </nav>
        </section>
        </section>
    )
            }