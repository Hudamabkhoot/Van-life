import React, { useState } from "react";
import HeaderNavLinks from "./HeaderNavLinks";
import { MdOutlineMenu, MdClose } from "react-icons/md";

export default function HeaderMobileNav() {
  const [click, setClick] = useState(false);

  const Hamburger = (
    <MdOutlineMenu
      className="HeaderHamburgerMenu"
      size="30px"
      color="black"
      onClick={() => setClick(!click)}
    />
  );
  const Close = (
    <MdClose
      className="HeaderHamburgerMenu"
      size="30px"
      color="black"
      onClick={() => setClick(!click)}
    />
  );

  return (
    <div className="HeaderMobileNav" onClick={() => setClick(!click)}>
      {click ? Close : Hamburger}
      {click && <HeaderNavLinks />}
    </div>
  );
}
