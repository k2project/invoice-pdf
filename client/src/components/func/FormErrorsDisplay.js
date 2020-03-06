import React from 'react';
import PropTypes from 'prop-types';

function FormErrorsDisplay({ errors }) {
    const arr = [];
    const errList = errors.map((err, i) => {
        if (!arr.includes(err.msg)) {
            arr.push(err.msg);
            return <p key={i + '_form__err'}>Error : {err.msg}</p>;
        }
    });
    return <div className='form__errs'>{errList}</div>;
}

FormErrorsDisplay.propTypes = {
    errors: PropTypes.array.isRequired
};

export default FormErrorsDisplay;
