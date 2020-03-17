import React from 'react';
import PropTypes from 'prop-types';
import plusIcon from './../../../../imgs/icons/plusIcon.png';
import profileIcon from './../../../../imgs/icons/profileIcon.png';

function DashboardNav(props) {
    return (
        <nav aria-labelledby='dashboard-menu-label' className='dashboard-nav'>
            <h2 id='dashboard-menu-label' className='sr-only'>
                Dashboard Menu
            </h2>
            <ul
                className='dashboard-nav__list'
                aria-labelledby='dashboard-menu-label'
            >
                <li>
                    <a href='' className='dashboard-nav__link'>
                        <img
                            src={profileIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Profile
                    </a>
                </li>

                <li>
                    <details>
                        <summary className='dashboard-nav__link'>
                            Companies
                        </summary>
                        <a href='' className='dashboard-nav__sublink'>
                            Compnay1
                        </a>
                        <a href='' className='dashboard-nav__sublink'>
                            Compnay2
                        </a>
                        <a href='' className='dashboard-nav__sublink'>
                            Compnay3
                        </a>
                    </details>
                </li>

                <li>
                    <a href='' className='dashboard-nav__link'>
                        <img
                            src={plusIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Add Company
                    </a>
                </li>
                <li>
                    <a href='' className='dashboard-nav__link'>
                        <img
                            src={plusIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        New Invoice
                    </a>
                </li>
            </ul>
        </nav>
    );
}

DashboardNav.propTypes = {};

export default DashboardNav;
