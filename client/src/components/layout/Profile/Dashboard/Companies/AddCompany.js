import React from 'react';
import PropTypes from 'prop-types';
import CompanyForm from './CompanyForm';

const AddCompany = ({ company, setDisplay }) => {
    return (
        <section className='add-company'>
            <div className='section__heading'>
                <h2 className='heading heading--sml' id='add-company-form'>
                    {company ? 'Update ' : 'Add a new '} company form.
                </h2>
            </div>
            <div className='section__body'>
                <CompanyForm
                    companyToUpdate={company}
                    setDisplay={setDisplay}
                />
            </div>
        </section>
    );
};

AddCompany.propTypes = {};

export default AddCompany;
