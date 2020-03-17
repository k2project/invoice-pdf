import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileDetails = ({ profile }) => {
    console.log(profile);
    return (
        <section className='dashboard__section'>
            <div className='section__heading'>
                <h3 className='heading heading--sml' id='profile-details'>
                    Profile details.
                </h3>
            </div>
            <div className='section__body'>
                <ul
                    arialabelledby='profile-details'
                    className='profile-details'
                ></ul>
            </div>
        </section>
    );
};

ProfileDetails.propTypes = {};
const mapStateToProps = state => ({
    profile: state.profile.profile
});
export default connect(mapStateToProps)(ProfileDetails);
