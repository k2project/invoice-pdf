import React from 'react';
import PropTypes from 'prop-types';
import updateIcon from '../../../imgs/icons/updateIcon.png';
import listIcon from '../../../imgs/icons/list.png';

const ProfileNav = props => {
    const handleLinkClick = e => {
        e.preventDefault();
    };
    return (
        <nav aria-label="Profile's navigation bar" className='submenu'>
            <div className='submenu__title'>Welcome!</div>
            <ul aria-label="Profile's navigation links">
                <li>
                    <a
                        href='#profile-details'
                        className='submenu__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={handleLinkClick}
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
                        onClick={handleLinkClick}
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

ProfileNav.propTypes = {};

export default ProfileNav;
