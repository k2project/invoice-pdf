import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import DashboardSubNav from './DashboardSubNav';

import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alerts';

import plusIcon from '../../imgs/icons/plusIcon.png';
import profileIcon from '../../imgs/icons/profileIcon.png';

const DashboardNav = ({ companies, setAlert }) => {
    return (
        <nav aria-label='dashboard submenu' className='dashboard-nav'>
            <ul
                className='dashboard-nav__list'
                aria-label='dashboard submenu links'
            >
                <li>
                    <Link
                        to='/dashboard/profile'
                        className={`dashboard-nav__link ${
                            /^\/dashboard\/profile/.test(
                                window.location.pathname
                            )
                                ? 'dashboard__link--is-active'
                                : ''
                        }`}
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => {
                            setAlert(
                                `Profile's settings now desplayed on the page `,
                                'success'
                            );
                        }}
                    >
                        <img
                            src={profileIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Profile
                    </Link>
                </li>

                {companies.length > 0 && <DashboardSubNav />}

                <li>
                    <Link
                        to='/dashboard/add-company'
                        className={`dashboard-nav__link ${
                            /^\/dashboard\/add-company/.test(
                                window.location.pathname
                            )
                                ? 'dashboard__link--is-active'
                                : ''
                        }`}
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => {
                            setAlert(
                                `Add a new company form now desplayed on the page `,
                                'success'
                            );
                        }}
                    >
                        <img
                            src={plusIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Add Company
                    </Link>
                </li>

                <li>
                    <Link
                        to='/dashboard/new-invoice'
                        className={`dashboard-nav__link ${
                            /^\/dashboard\/new-invoice/.test(
                                window.location.pathname
                            )
                                ? 'dashboard__link--is-active'
                                : ''
                        }`}
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => {
                            setAlert(
                                `Create a new invoice form now desplayed on the page `,
                                'success'
                            );
                        }}
                    >
                        <img
                            src={plusIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        New Invoice
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

DashboardNav.propTypes = {
    setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    companies: state.companies.companies
});
export default connect(mapStateToProps, {
    setAlert
})(DashboardNav);
