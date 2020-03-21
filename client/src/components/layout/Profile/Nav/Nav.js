import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, loadUser } from '../../../../redux/actions/user';
import { setAlert } from '../../../../redux/actions/alerts';

import './Nav.scss';

const Nav = ({ logoutUser, toggleDisplay, setAlert }) => {
    function handleClick(e) {
        e.preventDefault();
        const target = e.target.closest('a');
        const href = target.getAttribute('href').slice(1);
        tagActiveEl(target);
        toggleDisplay(href);
        setAlert(
            `${href} settings have been now desplayed on the page `,
            'success'
        );
    }

    function tagActiveEl(target) {
        Array.from(document.querySelectorAll('.main-nav__link')).forEach(a => {
            a.classList = 'main-nav__link';
        });
        target.classList = 'main-nav__link main-nav__link--is-active ';
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
                    <a
                        href='#dashboard'
                        onMouseDown={e => e.preventDefault()}
                        onClick={handleClick}
                        className='main-nav__link main-nav__link--is-active'
                    >
                        <span className='sr-only'>Display </span>
                        <span className='btn-text'> Dashboard</span>
                        <span className='sr-only'>
                            {' '}
                            settings on the page below
                        </span>
                    </a>
                </li>
                <li role='menuitem'>
                    <a
                        href='#account'
                        onMouseDown={e => e.preventDefault()}
                        onClick={handleClick}
                        className='main-nav__link'
                    >
                        <span className='sr-only'>Display </span>
                        <span className='btn-text'> Account</span>
                        <span className='sr-only'>
                            {' '}
                            settings on the page below
                        </span>
                    </a>
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
