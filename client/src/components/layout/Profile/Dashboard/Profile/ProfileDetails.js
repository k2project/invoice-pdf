import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileDetails = ({ profile }) => {
    useEffect(() => {
        if (document.querySelectorAll('.profile-details li').length === 0) {
            document.querySelector('.profile-details').textContent =
                "No profile's details saved. Please update your profile.";
        }
    });
    return (
        <div className='section__body'>
            <ul arialabelledby='profile-details' className='profile-details'>
                {profile.fullName && (
                    <li>
                        <span>Full Name:</span>
                        <span>{profile.fullName}</span>
                    </li>
                )}
                {profile.company && (
                    <li>
                        <span>Company Name:</span>
                        <span>{profile.company}</span>
                    </li>
                )}

                {profile.address.filter(el => el).length > 0 && (
                    <li className='profile-details__address'>
                        <span>Address:</span>
                        <span>
                            {profile.address
                                .filter(el => el)
                                .join('\n')
                                .slice(0, -1)}
                        </span>
                    </li>
                )}

                {profile.contact.email && (
                    <li>
                        <span>Email:</span>
                        <span>{profile.contact.email}</span>
                    </li>
                )}
                {profile.contact.mobile && (
                    <li>
                        <span>Tel/Mobile:</span>
                        <span>{profile.contact.mobile}</span>
                    </li>
                )}
                {profile.contact.fax && (
                    <li>
                        <span>Fax:</span>
                        <span>{profile.contact.fax}</span>
                    </li>
                )}
                {profile.contact.website && (
                    <li>
                        <span>Website:</span>
                        <span>{profile.contact.website}</span>
                    </li>
                )}

                <ul aria-label='bank details' className='profile-details__bank'>
                    {profile.bank.bankName && (
                        <li>
                            <span>Bank Name:</span>
                            <span>{profile.bank.bankName}</span>
                        </li>
                    )}
                    {profile.bank.bankSortCode && (
                        <li>
                            <span>Sort Code:</span>
                            <span>{profile.bank.bankSortCode}</span>
                        </li>
                    )}
                    {profile.bank.bankAccount && (
                        <li>
                            <span>Account Number:</span>
                            <span>{profile.bank.bankAccount}</span>
                        </li>
                    )}
                </ul>
            </ul>
        </div>
    );
};

ProfileDetails.propTypes = {};
const mapStateToProps = state => ({
    profile: state.profile.profile
});
export default connect(mapStateToProps)(ProfileDetails);
