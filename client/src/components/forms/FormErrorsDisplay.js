import React from 'react';
import PropTypes from 'prop-types';

function FormErrorsDisplay({ errors, label }) {
    function onClick(e) {
        e.preventDefault();
        let id = e.target.getAttribute('href');
        id = id.slice(1).trim();
        document.getElementById(id).focus();
    }
    const arr = [];
    const errList = errors.map((err, i) => {
        if (!arr.includes(err.msg)) {
            arr.push(err.msg);
            if (err.param) {
                return (
                    <li key={i + '_form__err'}>
                        <a
                            href={`#${err.param}
                        `}
                            onClick={onClick}
                        >
                            Error: {err.msg}
                        </a>
                    </li>
                );
            } else {
                return <li key={i + '_form__err'}>Error: {err.msg}</li>;
            }
        }
        return null;
    });
    return (
        <ul
            className='form__errs'
            role='alert'
            aria-label={`List of ${label} form errors links. Number of errors: ${arr.length}.`}
        >
            {errList}
        </ul>
    );
}

FormErrorsDisplay.propTypes = {
    errors: PropTypes.array.isRequired
};

export default FormErrorsDisplay;
