// src/components/SearchBar.js
import React from 'react';
import '../assets/styles/SearchBar.css';
import searchIcon from '../assets/images/search_icon.svg';

const SearchBar = () => (
  <div className="search-bar">
    <img src={searchIcon} alt="Search Icon" className="search-icon" />
    <input type="text" placeholder="Search" className="search-input" />
  </div>
);

export default SearchBar;
