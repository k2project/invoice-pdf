import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import ProfileDetails from './ProfileDetails';
import ProfileForm from '../../../../blocks/forms/ProfileForm';

const Profile = props => {
    const [form, displayForm] = useState(false);
    return (
        <section className='profile'>
            <h2 id='dashboard' className='sr-only'>
                Profile Settings
            </h2>
            <div className='section__heading'>
                <h3 className='heading heading--sml' id='profile-details'>
                    Profile details.
                </h3>
            </div>
            {!form && (
                <Fragment>
                    <ProfileDetails />
                    <div className='section__heading'>
                        <button
                            className='btn btn--grey'
                            onMouseDown={e => e.preventDefault()}
                        >
                            Update Profile
                        </button>
                    </div>
                </Fragment>
            )}
            {form && <ProfileForm />}
        </section>
    );
};

Profile.propTypes = {};

export default Profile;
