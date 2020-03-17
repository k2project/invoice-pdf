import React from 'react';
import PropTypes from 'prop-types';

const AddCompany = props => {
    return (
        <section className='add-company'>
            <div className='section__heading'>
                <h2 className='heading heading--sml' id='add-company-form'>
                    Add a new company form.
                </h2>
            </div>
            <div className='section__body'>form goes here</div>
        </section>
    );
};

AddCompany.propTypes = {};

export default AddCompany;
