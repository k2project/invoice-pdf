import React from 'react';
import PropTypes from 'prop-types';
import plusIcon from './../../../../imgs/icons/plusIcon.png';
import profileIcon from './../../../../imgs/icons/profileIcon.png';
import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/actions/alerts';

function DashboardNav({ companies, setDisplay, setCompany, setAlert }) {
    function handleLinkClick(e) {
        e.preventDefault();
        const target = e.target.closest('a');
        const href = target.getAttribute('href').slice(1);
        tagActiveEl(target);
        setDisplay(href);
        setAlert(`${href} now desplayed on the page `, 'success');
    }
    function handleSublinkClick(e) {
        e.preventDefault();
        const target = e.target.closest('a');
        const href = target.getAttribute('href').slice(1);
        tagActiveEl(target);
        setDisplay('company');
        setCompany(href);
        setAlert(
            `${target.textContent} settings are now desplayed on the page `,
            'success'
        );
    }

    function tagActiveEl(target) {
        Array.from(document.querySelectorAll('.dashboard-nav__list a')).forEach(
            a => {
                a.classList.remove('dashboard__link--is-active');
            }
        );
        target.classList.add('dashboard__link--is-active');
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
                        className='dashboard-nav__link dashboard__link--is-active'
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
                            {companies.map(company => {
                                return (
                                    <a
                                        key={company._id}
                                        href={`#${company._id}`}
                                        className='dashboard-nav__sublink'
                                        onClick={handleSublinkClick}
                                        onMouseDown={e => e.preventDefault()}
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
                        href='#add-company-form'
                        className='dashboard-nav__link'
                        onClick={handleLinkClick}
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
                        href='#new-invoice-form'
                        className='dashboard-nav__link'
                        onClick={handleLinkClick}
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
    setAlert: PropTypes.func.isRequired,
    setDisplay: PropTypes.func.isRequired,
    setCompany: PropTypes.func.isRequired,
    companies: PropTypes.array
};
const mapStateToProps = state => ({
    companies: state.profile.profile.companies
});
export default connect(mapStateToProps, { setAlert })(DashboardNav);

function shortenString(str) {
    const max = 25;
    if (str.length > max) {
        return str.slice(0, max) + '...';
    }
    return str;
}
