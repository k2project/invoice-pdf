import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MainNav.scss';

import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/user';
import { setAlert } from '../../redux/actions/alerts';

const MainNav = ({ redirectLink, logoutUser, setAlert }) => {
    const logout = () => {
        logoutUser();
        setAlert(
            'You have been logged out successfully.',
            'success',
            'login page'
        );
    };

    return (
        <nav aria-label='main naviagtion' id='main-nav'>
            <ul className='main-nav' role='menu'>
                <li role='menuitem'>
                    <Link
                        to='/dashboard'
                        onMouseDown={e => e.preventDefault()}
                        className='main-nav__logo'
                        onClick={() => {
                            setAlert(
                                `Dashboard's settings have been now desplayed on the page `,
                                'success'
                            );
                        }}
                    >
                        invoice
                    </Link>
                </li>
                <li role='menuitem'>
                    <Link
                        to={redirectLink}
                        onMouseDown={e => e.preventDefault()}
                        className={`main-nav__link ${
                            /^\/dashboard/.test(window.location.pathname)
                                ? 'main-nav__link--is-active'
                                : ''
                        }`}
                        onClick={() => {
                            setAlert(
                                `Dashboard's settings have been now desplayed on the page `,
                                'success'
                            );
                        }}
                    >
                        <span className='sr-only'>Display </span>
                        <span className='btn-text'> Dashboard</span>
                        <span className='sr-only'>
                            {' '}
                            settings on the page below
                        </span>
                    </Link>
                </li>
                <li role='menuitem'>
                    <Link
                        to='/account'
                        onMouseDown={e => e.preventDefault()}
                        className={`main-nav__link ${
                            /^\/account/.test(window.location.pathname)
                                ? 'main-nav__link--is-active'
                                : ''
                        }`}
                        onClick={() => {
                            setAlert(
                                `Account's settings have been now desplayed on the page `,
                                'success'
                            );
                        }}
                    >
                        <span className='sr-only'>Display </span>
                        <span className='btn-text'> Account</span>
                        <span className='sr-only'>
                            {' '}
                            settings on the page below
                        </span>
                    </Link>
                </li>
                <li role='menuitem'>
                    <Link
                        to='/'
                        className='main-nav__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={logout}
                    >
                        Sign Out
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

MainNav.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    redirectLink: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
    redirectLink: state.global.redirectLink
});
export default connect(mapStateToProps, {
    logoutUser,
    setAlert
})(MainNav);
