import React from 'react';
import './Account.scss';

import MainNav from '../MainNav/MainNav';
import DeleteAccount from './DeleteAccount';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';

const Account = () => {
    return (
        <div>
            <MainNav />
            <main id='main' className='account'>
                <h1 className='sr-only'>Account settings</h1>
                <ChangeEmail />
                <ChangePassword />
                <DeleteAccount />
            </main>
        </div>
    );
};

export default Account;
