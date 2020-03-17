import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileDetails = ({ profile }) => {
    const [profileState, setProfileState] = useState({
        fullName: null,
        company: null,
        address: null,
        contact: null,
        bank: null
    });

    let { fullName, company, address, contact, bank } = profileState;

    console.log(profile);
    return (
        <section>
            <h3 className='heading heading--sml'>Profile details.</h3>
            {/* <Fragment>
            {fullName && (
                <p>
                    <b>Full name:</b> {fullName}
                </p>
            )}
            {company && (
                <p>
                    <b>Company name:</b> {company}
                </p>
            )}
            {address.filter(i => i).length > 0 && (
                <p>
                    Address:{' '}
                    <b>{address.map(item => item).toString.slice(0, -1)}</b>
                </p>
            )}
            {(email || mobile) && (
                <p>
                    <b>CONTACT DETAILS</b>
                </p>
            )}
            {email && (
                <p>
                    <b>Email:</b> {email}
                </p>
            )}
            {mobile && (
                <p>
                    <b>Mobile:</b> {mobile}
                </p>
            )}
            {(bankAccount || bankName || bankSortCode) && (
                <p>
                    <b>BANK DETAILS</b>
                </p>
            )}
            {bankName && (
                <p>
                    <b>Bank Name:</b> {bankName}
                </p>
            )}
            {bankSortCode && (
                <p>
                    <b>Sort Code:</b> {bankSortCode}
                </p>
            )}
            {bankAccount && (
                <p>
                    <b>Account Number:</b> {bankAccount}
                </p>
            )}
        </Fragment> */}
        </section>
    );
};

ProfileDetails.propTypes = {};
const mapStateToProps = state => ({
    profile: state.profile.profile
});
export default connect(mapStateToProps)(ProfileDetails);
