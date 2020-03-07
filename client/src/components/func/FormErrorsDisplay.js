import React from 'react';
import PropTypes from 'prop-types';

function FormErrorsDisplay({ errors, label }) {
    const arr = [];
    const errList = errors.map((err, i) => {
        if (!arr.includes(err.msg)) {
            arr.push(err.msg);
            if (err.param) {
                return (
                    <li key={i + '_form__err'}>
                        <a href={`#${err.param}`}>Error :{err.msg}</a>
                    </li>
                );
            } else {
                return <li key={i + '_form__err'}>Error : {err.msg}</li>;
            }
        }
    });
    return (
        <ul className='form__errs' role='alert' aria-label={label}>
            {errList}
        </ul>
    );
}

FormErrorsDisplay.propTypes = {
    errors: PropTypes.array.isRequired
};

export default FormErrorsDisplay;
