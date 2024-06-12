import React from "react"
import  HeaderMobileNav from './HeaderMobileNav'
import  HeaderDesktopNav  from './HeaderDesktopNav'
import { Link } from "react-router-dom"
import Logo from '../assets/images/logo.png'

export default function Header() {
   

    return (
        <header>
            <Link className="site-logo" to="/"><img  src={Logo}/>Van Life</Link>
            <HeaderDesktopNav />
            <HeaderMobileNav />
        </header>
    )
            }