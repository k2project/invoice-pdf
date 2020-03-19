import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import ProfileDetails from './ProfileDetails';
import ProfileForm from './ProfileForm';

const Profile = props => {
    const [form, displayForm] = useState(false);
    async function updateForm() {
        await displayForm(true);
        document.querySelector('.form-profile input').focus();
    }
    return (
        <section className='profile'>
            <h2 id='dashboard' className='sr-only'>
                Profile Settings
            </h2>
            {!form && (
                <Fragment>
                    <div className='section__heading'>
                        <h3
                            className='heading heading--sml'
                            id='profile-details'
                        >
                            Profile details.
                        </h3>
                    </div>
                    <ProfileDetails />
                    <div className='section__heading'>
                        <button
                            className='btn btn--grey'
                            onMouseDown={e => e.preventDefault()}
                            onClick={updateForm}
                        >
                            Update Profile
                        </button>
                    </div>
                </Fragment>
            )}
            {form && (
                <Fragment>
                    <div className='section__heading'>
                        <h3
                            className='heading heading--sml'
                            id='profile-details'
                        >
                            Update profile details form.
                        </h3>
                    </div>
                    <div className='section__body'>
                        <ProfileForm displayForm={displayForm} update />
                    </div>
                </Fragment>
            )}
        </section>
    );
};

Profile.propTypes = {};

export default Profile;
