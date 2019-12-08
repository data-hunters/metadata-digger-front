import React, { FC, useState } from 'react';
import styled from 'styled-components';

import logo from '../assets/metadata-digger.png';

const NavbarLogo = styled.img`
  width: 200px;
`;

const SearchForm = styled.form`
  width: 500px;
`

interface NavbarProps {
  onSubmitSearch: (searchQuery: string) => void;
}

const Navbar: FC<NavbarProps> = (props) => {
  const [searchQuery, updateSearchQuery] = useState<string>("");
  return (
    <header className="main-header">
      <nav className="navbar navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <NavbarLogo src={logo} alt="logo" />
          </div>
          <div>
            <SearchForm className="navbar-form navbar-right" role="search">
              <input
                className="form-control"
                value={searchQuery}
                onChange={(event) => {
                  updateSearchQuery(event.target.value)
                }}
                placeholder="Search in your dataset..." />
            </SearchForm>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;