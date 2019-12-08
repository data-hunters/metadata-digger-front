import React from 'react';
import styled from 'styled-components';

import logo from '../assets/metadata-digger.png';

const NavbarLogo = styled.img`
  width: 200px;
`

const Navbar = () => {
  return (
    <header className="main-header">
      <nav className="navbar navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <NavbarLogo src={logo} alt="logo" />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;