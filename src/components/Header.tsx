import React from 'react';
import User from './User';

import '../css/header.css';

const Header = () => {
    return (
        <div className='header'>
            <h1>Hilarity</h1>
            <div className='links'>
                <a href="/list"><button>List Games</button></a>
                <a href="/create"><button>Create Game</button></a>
            </div>
            <User />
        </div>
    );
};

export default Header;