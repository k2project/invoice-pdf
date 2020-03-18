import React from 'react';
import PropTypes from 'prop-types';
import CompanyForm from './CompanyForm';

const AddCompany = props => {
    return (
        <section className='add-company'>
            <div className='section__heading'>
                <h2 className='heading heading--sml' id='add-company-form'>
                    Add a new company form.
                </h2>
            </div>
            <div className='section__body'>
                <CompanyForm />
            </div>
        </section>
    );
};

AddCompany.propTypes = {};

export default AddCompany;
