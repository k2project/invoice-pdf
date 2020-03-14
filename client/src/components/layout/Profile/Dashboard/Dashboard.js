import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import plusIcon from './../../../../imgs/icons/plusIcon.png';
import profileIcon from './../../../../imgs/icons/profileIcon.png';

const Dashboard = props => {
    const [display, setDisplay] = useState('profile');
    return (
        <main className='dashboard' id='main'>
            <h1 id='dashboard' className='sr-only'>
                Dashboard
            </h1>
            <nav aria-labelledby='dashboard-menu-label'>
                <h2 id='dashboard-menu-label' class='sr-only'>
                    Dashboard Menu
                </h2>
                <ul
                    className='dashboard-nav'
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
                        <a href='' className='dashboard-nav__link'>
                            <img
                                src={plusIcon}
                                className='dashboard__icon'
                                alt=''
                            />
                            New Invoice
                        </a>
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
                </ul>
                {/* {display === 'profile' && <Profile />} */}
            </nav>
            <div id='profile'>profile</div>
        </main>
    );
};

Dashboard.propTypes = {};

export default Dashboard;
