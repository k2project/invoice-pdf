import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Dashboard.scss';

import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alerts';

import plusIcon from '../../imgs/icons/plusIcon.png';
import profileIcon from '../../imgs/icons/profileIcon.png';

const DashboardNav = ({ profile, setAlert }) => {
    return (
        <nav aria-label='dashboard submenu' className='dashboard-nav'>
            <ul
                className='dashboard-nav__list'
                aria-label='dashboard submenu links'
            >
                <li>
                    <Link
                        to='/dashboard/profile'
                        className={`dashboard-nav__link ${
                            /^\/dashboard\/profile/.test(
                                window.location.pathname
                            )
                                ? 'dashboard__link--is-active'
                                : ''
                        }`}
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => {
                            setAlert(
                                `Profile's settings now desplayed on the page `,
                                'success'
                            );
                        }}
                    >
                        <img
                            src={profileIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Profile
                    </Link>
                </li>
                {/* {profile.companies && profile.companies.length > 0 && (
                    <li>
                        <details onMouseDown={e => e.preventDefault()}>
                            <summary className='dashboard-nav__link'>
                                Companies
                            </summary>
                            {profile.companies
                                .sort((a, b) =>
                                    a.companyName.localeCompare(b.companyName)
                                )
                                .map(company => {
                                    return (
                                        <Link
                                            key={company._id}
                                            to='/dashboard/company'
                                            className={`dashboard-nav__sublink ${
                                                companyToDisplay ===
                                                    company._id &&
                                                currentNavLink === 'company'
                                                    ? 'dashboard__link--is-active'
                                                    : ''
                                            }`}
                                            onClick={company => {
                                                // displayCompany(company._id);
                                                setAlert(
                                                    `The ${company.companyName} settings are now desplayed on the page `,
                                                    'success'
                                                );
                                            }}
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
                                        </Link>
                                    );
                                })}
                        </details>
                    </li>
                )} */}

                <li>
                    <Link
                        to='/dashboard/add-company'
                        className={`dashboard-nav__link ${
                            /^\/dashboard\/add-company/.test(
                                window.location.pathname
                            )
                                ? 'dashboard__link--is-active'
                                : ''
                        }`}
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => {
                            setAlert(
                                `Add a new company form now desplayed on the page `,
                                'success'
                            );
                        }}
                    >
                        <img
                            src={plusIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Add Company
                    </Link>
                </li>

                <li>
                    <Link
                        to='/dashboard/new-invoice'
                        className={`dashboard-nav__link ${
                            /^\/dashboard\/new-invoice/.test(
                                window.location.pathname
                            )
                                ? 'dashboard__link--is-active'
                                : ''
                        }`}
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => {
                            setAlert(
                                `Create a new invoice form now desplayed on the page `,
                                'success'
                            );
                        }}
                    >
                        <img
                            src={plusIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        New Invoice
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

DashboardNav.propTypes = {
    setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile.profile
});
export default connect(mapStateToProps, { setAlert })(DashboardNav);

function shortenString(str) {
    const max = 25;
    if (str.length > max) {
        return str.slice(0, max) + '...';
    }
    return str;
}
