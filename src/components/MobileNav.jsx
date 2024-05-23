import React, { useState } from "react"
import { Link } from "react-router-dom"
import NavLinks from './NavLinks'
import { MdOutlineMenu, MdClose } from "react-icons/md";

export default function MobileNav() {
    const [click, setClick] = useState(false);
    
    const Hamburger = <MdOutlineMenu 
    className="HamburgerMenu"
    size="30px" 
    color="black"
    onClick={() => setClick(!click)} 
    />
    const Close = <MdClose 
    className="HamburgerMenu"
    size="30px" 
    color="black"
    onClick={() => setClick(!click)} />

    return (
            <div className="MobileNav" onClick={() => setClick(!click)}>
             { click ? Close : Hamburger}
              {click && <NavLinks />}                         
            </div>
    )
            }