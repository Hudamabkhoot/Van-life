import React, { useState } from "react"
import  MobileNav from './MobileNav'
import  DesktopNav  from './DesktopNav'
import { Link } from "react-router-dom"

export default function Header() {
   

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <DesktopNav />
            <MobileNav />
        </header>
    )
            }