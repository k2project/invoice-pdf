import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCompanyCurrentNavLink } from '../../../redux/actions/company';

import tasksIcon from '../../../imgs/icons/tasksIcon.png';
import invoicesIcon from '../../../imgs/icons/invoicesIcon.png';
import updateIcon from '../../../imgs/icons/updateIcon.png';
import listIcon from '../../../imgs/icons/list.png';
import deleteIcon from '../../../imgs/icons/deleteIcon.png';
import { displayCompanyName } from '../../../utils/funs';

const CompanyNav = ({ companies, setCompanyCurrentNavLink }) => {
    let { id } = useParams();
    const company = companies.find(c => c._id === id);
    const { companyName, companyAcronym } = company;
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
                    <a
                        href='#company-delete'
                        className='submenu__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={e => {
                            e.preventDefault();
                            setCompanyCurrentNavLink('delete');
                        }}
                    >
                        <img
                            src={deleteIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Delete Company
                    </a>
                </li>
            </ul>
        </nav>
    );
};

CompanyNav.propTypes = {
    setCompanyCurrentNavLink: PropTypes.func.isRequired,
    companies: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    companies: state.profile.profile.companies
});
export default connect(mapStateToProps, { setCompanyCurrentNavLink })(
    CompanyNav
);
