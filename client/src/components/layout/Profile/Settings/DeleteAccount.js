import React from 'react';
import PropTypes from 'prop-types';

const DeleteAccount = props => {
    function handleClick(e) {
        e.preventDefault();
    }
    function onEnter(e) {
        if (e.keyCode === 13) handleClick(e);
    }
    return (
        <section>
            <h2 className='heading heading--sml'>Delete Account.</h2>
            <p>
                Once you delete your account, there is no going back. Please be
                certain.
            </p>
            <button
                className='btn btn--danger'
                onMouseDown={handleClick}
                onKeyDown={onEnter}
            >
                Delete Account
            </button>
        </section>
    );
};

DeleteAccount.propTypes = {};

export default DeleteAccount;
