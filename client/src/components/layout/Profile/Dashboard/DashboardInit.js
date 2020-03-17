import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileForm from '../../../blocks/forms/ProfileForm';

function DashboardInit(props) {
    useEffect(() => {
        if (document.querySelector('.form-profile input'))
            document.querySelector('.form-profile input').focus();
    }, []);
    return (
        <section className='dashboard__init'>
            <div className='dashboard__init-heading'>
                <div className='wrapper'>
                    <h2 className='heading heading--sml'>
                        Create your profile.
                    </h2>
                </div>
            </div>
            <div className='dashboard__init-form'>
                <div className='wrapper'>
                    <ProfileForm />
                </div>
            </div>
        </section>
    );
}

DashboardInit.propTypes = {};

export default DashboardInit;
