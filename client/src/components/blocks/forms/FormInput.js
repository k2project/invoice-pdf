import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inputOnChange } from './formFuns';

const FormInput = ({
    type = 'text',
    name,
    size = 'sml',
    children,
    form,
    textarea
}) => {
    const onChange = e => {
        inputOnChange(e, form.formData, form.setFormData);
    };
    if (textarea) {
        return (
            <Fragment>
                <label htmlFor={name}>{children}</label>
                <textarea
                    name={name}
                    id={name}
                    onChange={onChange}
                    className='txtarea txtarea--md'
                >
                    {form.formData[name]}
                </textarea>
            </Fragment>
        );
    } else {
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
    }
};

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired
};

export default FormInput;
