import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setAlert } from '../../../../../redux/actions/alerts';

const NewInvoice = ({ id, setDisplay, companies, setAlert }) => {
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const c = companies.find(c => c._id === id);
        setCompany(c);
    }, [company]);
    return (
        <section>
            <div className='section__heading'>
                <h2 className='heading heading--sml' id='new-invoice-form'>
                    Create a new invoice form
                    {id && company ? ` for ${company.companyName}.` : '.'}
                </h2>
            </div>
            <div className='section__body'>
                <p>new invoice</p>
                {id && company && (
                    <button
                        className='btn btn--grey'
                        onClick={() => setDisplay('company')}
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
    companies: state.profile.profile.companies
});
export default connect(mapStateToProps, { setAlert })(NewInvoice);
