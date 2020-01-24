import React, { FC, useState, useMemo } from 'react';
import styled from 'styled-components';
import _debounce from 'lodash/debounce';

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
  const DEBOUNCE_TIME_MS = 600;

  const handleSearchSubmit = useMemo(() =>
    _debounce((query: string) => {
      props.onSubmitSearch(query);
    }, DEBOUNCE_TIME_MS),
  [props]);


  return (
    <header className="main-header">
      <nav className="navbar navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <NavbarLogo src={logo} alt="logo" />
          </div>
          <div>
            <SearchForm onSubmit={e => e.preventDefault()} className="navbar-form navbar-right" role="search">
              <input
                className="form-control"
                value={searchQuery}
                onChange={(event) => {
                  const query = event.target.value
                  updateSearchQuery(query);
                  handleSearchSubmit(query);
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