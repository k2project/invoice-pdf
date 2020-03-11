import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

const DeleteAccount = props => {
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    async function handleDelete(e) {
        e.preventDefault();
        await setDeleteConfirmation(true);
        document.getElementById('password').focus();
    }
    function deleteOnEnter(e) {
        if (e.keyCode === 13) handleDelete(e);
    }
    function handleCancelation() {
        setDeleteConfirmation(false);
    }
    function cancelationOnEnter(e) {
        if (e.keyCode === 13) handleCancelation(e);
    }
    return (
        <section className='delete-account'>
            <h2 className='heading heading--sml'>Delete Account.</h2>
            <p>
                Once you delete your account, there is no going back. Please be
                certain.
            </p>
            <form>
                {deleteConfirmation && (
                    <Fragment>
                        <label htmlFor='password'>
                            Enter password to confirm the deactivation of your
                            account.
                        </label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            className='form__input form__input--sml'
                        />
                    </Fragment>
                )}
                {deleteConfirmation && (
                    <button
                        className='btn btn--grey btn--sibling'
                        onMouseDown={handleCancelation}
                        onKeyDown={cancelationOnEnter}
                    >
                        Cancel
                    </button>
                )}
                <button
                    className='btn btn--danger'
                    onMouseDown={handleDelete}
                    onKeyDown={deleteOnEnter}
                >
                    Delete Account
                </button>
            </form>
        </section>
    );
};

DeleteAccount.propTypes = {};

export default DeleteAccount;
