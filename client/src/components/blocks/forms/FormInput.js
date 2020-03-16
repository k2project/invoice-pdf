import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inputOnChange } from './formFuns';

const FormInput = ({ type = 'text', name, size = 'sml', children, form }) => {
    const onChange = e => {
        inputOnChange(e, form.formData, form.setFormData);
    };
    return (
        <Fragment>
            <label htmlFor={name}>{children}</label>
            <input
                type={type}
                name={name}
                id={name}
                onChange={onChange}
                className={'form__input form__input--' + size}
                value={form.formData[name]}
            />
        </Fragment>
    );
};

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default FormInput;
