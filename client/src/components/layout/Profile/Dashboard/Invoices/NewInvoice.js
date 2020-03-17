import React from 'react';
import PropTypes from 'prop-types';

const NewInvoice = props => {
    return (
        <section className='add-company'>
            <div className='section__heading'>
                <h2 className='heading heading--sml' id='new-invoice-form'>
                    Create a new invoice form.
                </h2>
            </div>
            <div className='section__body'>form goes here</div>
        </section>
    );
};

NewInvoice.propTypes = {};

export default NewInvoice;
