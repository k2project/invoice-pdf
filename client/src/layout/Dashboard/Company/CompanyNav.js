import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCompanyCurrentNavLink } from '../../../redux/actions/company';

import updateIcon from '../../../imgs/icons/updateIcon.png';
import listIcon from '../../../imgs/icons/list.png';

const CompanyNav = ({ companies, setCompanyCurrentNavLink }) => {
    let { id } = useParams();
    const company = companies.find(c => c._id === id);
    return (
        <nav aria-label="Company's navigation bar" className='submenu'>
            <div className='submenu__title'>{company.companyName}</div>
            <ul aria-label="Company's navigation links">
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
