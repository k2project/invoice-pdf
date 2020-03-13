import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, loadUser } from '../../../../redux/actions/auth';
import { setAlert } from '../../../../redux/actions/alerts';

import './Nav.scss';

const Nav = ({ logoutUser, toggleDisplay, setAlert }) => {
    function handleClick(e) {
        const target = e.target.closest('button ');
        const text = target.firstElementChild.nextElementSibling.textContent.trim();
        toggleDisplay(text);
        tagActiveEl(target);
    }

    function tagActiveEl(target) {
        Array.from(document.querySelectorAll('.main-nav button')).forEach(
            btn => (btn.classList = '')
        );
        target.classList.add('btn--is-active');
    }
    function logout() {
        setAlert(
            'You have been logged out successfully.',
            'success',
            'login page'
        );
        logoutUser();
    }
    return (
        <nav aria-label='main naviagtion' id='main-nav'>
            <ul className='main-nav' role='menu'>
                <li role='menuitem'>
                    <button
                        onMouseDown={e => e.preventDefault()}
                        onClick={handleClick}
                        className='btn--is-active'
                    >
                        <span className='sr-only'>Display </span>
                        <span className='btn-text'> Dashboard</span>
                        <span className='sr-only'> settings on the page</span>
                    </button>
                </li>
                <li role='menuitem'>
                    <button
                        onMouseDown={e => e.preventDefault()}
                        onClick={handleClick}
                    >
                        <span className='sr-only'>Display </span>
                        <span className='btn-text'> Account</span>
                        <span className='sr-only'> settings on the page</span>
                    </button>
                </li>
                <li role='menuitem'>
                    <button
                        onMouseDown={e => e.preventDefault()}
                        onClick={logout}
                    >
                        Sign Out
                    </button>
                </li>
            </ul>
        </nav>
    );
};

Nav.propTypes = {};

export default connect(null, { setAlert, logoutUser })(Nav);
