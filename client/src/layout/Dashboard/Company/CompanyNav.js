import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    setCompanyCurrentNavLink,
    deleteCompany
} from '../../../redux/actions/company';

import tasksIcon from '../../../imgs/icons/tasksIcon.png';
import invoicesIcon from '../../../imgs/icons/invoicesIcon.png';
import updateIcon from '../../../imgs/icons/updateIcon.png';
import listIcon from '../../../imgs/icons/list.png';
import deleteIcon from '../../../imgs/icons/deleteIcon.png';
import { displayCompanyName } from '../../../utils/funs';
import { dialogBox } from '../../../components/alerts/alertsFuns';

const CompanyNav = ({ companies, setCompanyCurrentNavLink, deleteCompany }) => {
    let { id } = useParams();
    const company = companies.find(c => c._id === id);
    const { _id, companyName, companyAcronym } = company;

    const handleDelete = e => {
        const targetEl = e.target;
        dialogBox(` delete ${companyName}`, () => deleteCompany(_id), targetEl);
        document.getElementById('dialog-cancel').focus();
    };

    return (
        <nav aria-label="Company's navigation bar" className='submenu'>
            <div className='submenu__title'>
                {displayCompanyName(companyName, companyAcronym, 20)}
            </div>
            <ul aria-label="Company's navigation links">
                <li>
                    <a
                        href='#company-tasks'
                        className='submenu__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={e => {
                            e.preventDefault();
                            setCompanyCurrentNavLink('tasks');
                        }}
                    >
                        <img
                            src={tasksIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Tasks
                    </a>
                </li>
                <li>
                    <a
                        href='#company-invoices'
                        className='submenu__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={e => {
                            e.preventDefault();
                            setCompanyCurrentNavLink('invoices');
                        }}
                    >
                        <img
                            src={invoicesIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Invoices
                    </a>
                </li>
                <li>
                    <a
                        href='#company-details'
                        className='submenu__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={e => {
                            e.preventDefault();
                            setCompanyCurrentNavLink('details');
                        }}
                    >
                        <img
                            src={listIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Details
                    </a>
                </li>
                <li>
                    <a
                        href='#company-update'
                        className='submenu__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={e => {
                            e.preventDefault();
                            setCompanyCurrentNavLink('update');
                        }}
                    >
                        <img
                            src={updateIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Update Company
                    </a>
                </li>
                <li>
                    <button
                        className='submenu__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={handleDelete}
                    >
                        <img
                            src={deleteIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Delete Company
                    </button>
                </li>
            </ul>
        </nav>
    );
};

CompanyNav.propTypes = {
    setCompanyCurrentNavLink: PropTypes.func.isRequired,
    deleteCompany: PropTypes.func.isRequired,
    companies: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    companies: state.profile.profile.companies
});
export default connect(mapStateToProps, {
    setCompanyCurrentNavLink,
    deleteCompany
})(CompanyNav);
