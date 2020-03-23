import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProfileCurrentNavLink } from '../../../redux/actions/profile';

import updateIcon from '../../../imgs/icons/updateIcon.png';
import listIcon from '../../../imgs/icons/list.png';

const ProfileNav = ({ setProfileCurrentNavLink }) => {
    return (
        <nav aria-label="Profile's navigation bar" className='submenu'>
            <div className='submenu__title'>Welcome!</div>
            <ul aria-label="Profile's navigation links">
                <li>
                    <a
                        href='#profile-details'
                        className='submenu__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={e => {
                            e.preventDefault();
                            setProfileCurrentNavLink('details');
                        }}
                    >
                        <img
                            src={listIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Details
                    </a>
                </li>
                <li>
                    <a
                        href='#profile-update'
                        className='submenu__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={e => {
                            e.preventDefault();
                            setProfileCurrentNavLink('update');
                        }}
                    >
                        <img
                            src={updateIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Update Profile
                    </a>
                </li>
            </ul>
        </nav>
    );
};

ProfileNav.propTypes = {
    setProfileCurrentNavLink: PropTypes.func.isRequired
};

export default connect(null, { setProfileCurrentNavLink })(ProfileNav);
