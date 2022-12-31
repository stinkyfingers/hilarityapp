import React from 'react';
import { Link } from "react-router-dom";
import User from './User';

import '../css/header.css';

const Header = () => {
    return (
        <div className='header'>
            <h1>Hilarity</h1>
            <div className='links'>
                <Link to="/list"><button>List Games</button></Link>
                <Link to="/create"><button>Create Game</button></Link>
            </div>
            <User />
        </div>
    );
};

export default Header;