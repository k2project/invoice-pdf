import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { inputOnChange } from './formFuns';

const FormInput = ({
    type = 'text',
    name,
    size = 'sml',
    children,
    form,
    checked
}) => {
    const onChange = e => {
        inputOnChange(e, form.formData, form.setFormData);
    };
    const onCheckboxClick = e => {
        e.target.value = e.target.checked === true ? true : false;
    };
    useEffect(() => {
        if (checked) {
            const checkbox = document.querySelector('.input-checkbox input');
            if (checkbox) {
                checkbox.checked = true;
            }
        }
    }, [checked]);
    switch (type) {
        case 'checkbox':
            return (
                <Fragment>
                    <div className='input-checkbox'>
                        <label htmlFor={name}>{children}</label>
                        <input
                            type={type}
                            name={name}
                            id={name}
                            onChange={onChange}
                            className={'form__input form__input--' + size}
                            value={form.formData[name] || ''}
                            onClick={onCheckboxClick}
                            onMouseDown={e => e.preventDefault()}
                        />
                        <span className='input-checkbox__checkmark'></span>
                    </div>
                </Fragment>
            );
        case 'textarea':
            return (
                <Fragment>
                    <label htmlFor={name}>{children}</label>
                    <textarea
                        name={name}
                        id={name}
                        onChange={onChange}
                        className='txtarea txtarea--md'
                        value={form.formData[name] || ''}
                    />
                </Fragment>
            );
        case 'text':
        default:
            return (
                <Fragment>
                    <label htmlFor={name}>{children}</label>
                    <input
                        type={type}
                        name={name}
                        id={name}
                        onChange={onChange}
                        className={'form__input form__input--' + size}
                        value={form.formData[name] || ''}
                    />
                </Fragment>
            );
    }
    // if (textarea) {
    //     return (
    //         <Fragment>
    //             <label htmlFor={name}>{children}</label>
    //             <textarea
    //                 name={name}
    //                 id={name}
    //                 onChange={onChange}
    //                 className='txtarea txtarea--md'
    //             >
    //                 {form.formData[name]}
    //             </textarea>
    //         </Fragment>
    //     );
    // } else {
    //     return (
    //         <Fragment>
    //             <label htmlFor={name}>{children}</label>
    //             <input
    //                 type={type}
    //                 name={name}
    //                 id={name}
    //                 onChange={onChange}
    //                 className={'form__input form__input--' + size}
    //                 value={form.formData[name]}
    //             />
    //         </Fragment>
    //     );
    // }
};

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired
};

export default FormInput;
