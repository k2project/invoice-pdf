import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../../redux/actions/auth';

import './Nav.scss';

const Nav = ({ logoutUser, toggleDisplay }) => {
    function handleClick(e) {
        e.preventDefault();
        const target = e.target.closest('button ');

        const text = target.firstElementChild.nextElementSibling.textContent.trim();
        toggleDisplay(text);
        tagActiveEl(target);
    }
    function onEnter(e) {
        if (e.keyCode === 13) handleClick(e);
    }
    function tagActiveEl(target) {
        Array.from(document.querySelectorAll('.main-nav button')).forEach(
            btn => (btn.classList = '')
        );
        target.classList.add('btn--is-active');
    }
    return (
        <nav aria-label='main naviagtion' id='main-nav'>
            <ul className='main-nav' role='menu'>
                <li role='menuitem'>
                    <button
                        onMouseDown={handleClick}
                        onKeyDown={onEnter}
                        className='btn--is-active'
                    >
                        <span className='sr-only'>Display </span>
                        <span className='btn-text'> Dashboard</span>
                        <span className='sr-only'> settings on the page</span>
                    </button>
                </li>
                <li role='menuitem'>
                    <button onMouseDown={handleClick} onKeyDown={onEnter}>
                        <span className='sr-only'>Display </span>
                        <span className='btn-text'> Account</span>
                        <span className='sr-only'> settings on the page</span>
                    </button>
                </li>
                <li role='menuitem'>
                    <button
                        onMouseDown={logoutUser}
                        onKeyDown={e => {
                            if (e.keyCode === 13) logoutUser();
                        }}
                    >
                        Sign Out
                    </button>
                </li>
            </ul>
        </nav>
    );
};

Nav.propTypes = {};

export default connect(null, { logoutUser })(Nav);
