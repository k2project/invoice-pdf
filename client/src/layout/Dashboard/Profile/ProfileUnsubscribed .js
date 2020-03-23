import React from 'react';
import PropTypes from 'prop-types';
import ProfileForm from '../../../components/forms/ProfileForm';

const ProfileUnsubscribed = props => {
    return (
        <div className='profile__unsubscribed'>
            <div className='section__heading'>
                <div className='wrapper'>
                    <h2 className='heading heading--sm'>
                        Please create your profile.
                    </h2>
                </div>
            </div>
            <div className='section__body'>
                <div className='wrapper'>
                    <p>
                        Not feeling like doing it right now? No problem! <br />{' '}
                        Just submit the form and you can always update the
                        details later in the <b>Profile</b> settings.
                    </p>
                    <ProfileForm />
                </div>
            </div>
        </div>
    );
};

ProfileUnsubscribed.propTypes = {};

export default ProfileUnsubscribed;
