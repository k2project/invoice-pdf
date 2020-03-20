import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setAlert } from '../../../../../redux/actions/alerts';
import { displayCurrentLink } from '../../../../../redux/actions/dasboard';

const NewInvoice = ({
    companies,
    dashboard: { companyToDisplay },
    setAlert,
    displayCurrentLink
}) => {
    const company = companies.find(c => c._id === companyToDisplay);
    console.log(company);

    return (
        <section>
            <div className='section__heading'>
                <h2 className='heading heading--sml' id='new-invoice-form'>
                    Create a new invoice form
                    {company ? ` for ${company.companyName}.` : '.'}
                </h2>
            </div>
            <div className='section__body'>
                <p>new invoice</p>
                {company && (
                    <button
                        className='btn btn--grey'
                        onClick={() => displayCurrentLink('company')}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </section>
    );
};

NewInvoice.propTypes = {};
const mapStateToProps = state => ({
    companies: state.profile.profile.companies,
    dashboard: state.dashboard
});
export default connect(mapStateToProps, { setAlert, displayCurrentLink })(
    NewInvoice
);
