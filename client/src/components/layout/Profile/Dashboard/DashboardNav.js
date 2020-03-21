import React from 'react';
import PropTypes from 'prop-types';
import plusIcon from './../../../../imgs/icons/plusIcon.png';
import profileIcon from './../../../../imgs/icons/profileIcon.png';
import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/actions/alerts';
import { displayCurrentLink } from '../../../../redux/actions/dasboard';
import {
    displayCompany,
    updateCompany,
    invoiceCompany
} from '../../../../redux/actions/company';

function DashboardNav({
    companies,
    dashboard: { currentNavLink },
    company: { companyToDisplay },
    displayCurrentLink,
    displayCompany,
    updateCompany,
    invoiceCompany,
    setAlert
}) {
    function handleLinkClick(e) {
        e.preventDefault();
        const target = e.target.closest('a');
        const href = target.getAttribute('href').slice(1);
        displayCurrentLink(href);
        setAlert(`${href} now desplayed on the page `, 'success');
    }
    function handleSublinkClick(e) {
        e.preventDefault();
        const target = e.target.closest('a');
        const href = target.getAttribute('href').slice(1);
        displayCompany(href);
        setAlert(
            `${target.textContent} settings are now desplayed on the page `,
            'success'
        );
    }

    return (
        <nav aria-labelledby='dashboard-menu-label' className='dashboard-nav'>
            <h2 id='dashboard-menu-label' className='sr-only'>
                Dashboard Menu
            </h2>
            <ul
                className='dashboard-nav__list'
                aria-labelledby='dashboard-menu-label'
            >
                <li>
                    <a
                        href='#profile-settings'
                        className={`dashboard-nav__link ${
                            currentNavLink === 'profile-settings'
                                ? 'dashboard__link--is-active'
                                : ''
                        }`}
                        onClick={handleLinkClick}
                        onMouseDown={e => e.preventDefault()}
                    >
                        <img
                            src={profileIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Profile
                    </a>
                </li>
                {companies.length > 0 && (
                    <li>
                        <details onMouseDown={e => e.preventDefault()}>
                            <summary className='dashboard-nav__link'>
                                Companies
                            </summary>
                            {companies
                                .sort((a, b) =>
                                    a.companyName.localeCompare(b.companyName)
                                )
                                .map(company => {
                                    return (
                                        <a
                                            key={company._id}
                                            href={`#${company._id}`}
                                            className={`dashboard-nav__sublink ${
                                                companyToDisplay ===
                                                    company._id &&
                                                currentNavLink === 'company'
                                                    ? 'dashboard__link--is-active'
                                                    : ''
                                            }`}
                                            onClick={handleSublinkClick}
                                            onMouseDown={e =>
                                                e.preventDefault()
                                            }
                                        >
                                            {company.showAcronym &&
                                            company.companyAcronym
                                                ? company.companyAcronym
                                                : shortenString(
                                                      company.companyName
                                                  )}
                                        </a>
                                    );
                                })}
                        </details>
                    </li>
                )}

                <li>
                    <a
                        href='#company-form'
                        className={`dashboard-nav__link ${
                            currentNavLink === 'company-form'
                                ? 'dashboard__link--is-active'
                                : ''
                        }`}
                        onClick={e => {
                            handleLinkClick(e);
                            updateCompany(null);
                        }}
                        onMouseDown={e => e.preventDefault()}
                    >
                        <img
                            src={plusIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Add Company
                    </a>
                </li>

                <li>
                    <a
                        href='#invoice-form'
                        className={`dashboard-nav__link ${
                            currentNavLink === 'invoice-form'
                                ? 'dashboard__link--is-active'
                                : ''
                        }`}
                        onClick={e => {
                            handleLinkClick(e);
                            invoiceCompany(null);
                        }}
                        onMouseDown={e => e.preventDefault()}
                    >
                        <img
                            src={plusIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        New Invoice
                    </a>
                </li>
            </ul>
        </nav>
    );
}

DashboardNav.propTypes = {
    setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    companies: state.profile.profile.companies,
    dashboard: state.dashboard,
    company: state.company
});
export default connect(mapStateToProps, {
    setAlert,
    displayCurrentLink,
    displayCompany,
    updateCompany,
    invoiceCompany
})(DashboardNav);

function shortenString(str) {
    const max = 25;
    if (str.length > max) {
        return str.slice(0, max) + '...';
    }
    return str;
}
