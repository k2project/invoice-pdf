import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alerts';

const DasboardSubNav = props => {
    let { id } = useParams();
    const { companies } = props;
    return (
        <Fragment>
            {companies.length > 0 && (
                <li>
                    {companies.find(c => c._id === id) ? (
                        <details onMouseDown={e => e.preventDefault()} open>
                            <SubNavLinks {...props} />
                        </details>
                    ) : (
                        <details onMouseDown={e => e.preventDefault()}>
                            <SubNavLinks {...props} />
                        </details>
                    )}
                </li>
            )}
        </Fragment>
    );
};

DasboardSubNav.propTypes = {
    companies: PropTypes.array.isRequired,
    setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    companies: state.profile.profile.companies
});
export default connect(mapStateToProps, { setAlert })(DasboardSubNav);

function SubNavLinks({ companies, setAlert }) {
    return (
        <Fragment>
            <summary className='dashboard-nav__link'>Companies</summary>
            {companies
                .sort((a, b) => a.companyName.localeCompare(b.companyName))
                .map(company => {
                    return (
                        <Link
                            key={company._id}
                            to={`/dashboard/company/${company._id}`}
                            className='dashboard-nav__sublink'
                            onClick={() => {
                                localStorage.setItem('details', true);
                                setAlert(
                                    `The ${company.companyName} settings are now desplayed on the page `,
                                    'success'
                                );
                            }}
                            onMouseDown={e => e.preventDefault()}
                        >
                            {company.showAcronym && company.companyAcronym
                                ? company.companyAcronym
                                : shortenString(company.companyName)}
                        </Link>
                    );
                })}
        </Fragment>
    );
}

function shortenString(str) {
    const max = 25;
    if (str.length > max) {
        return str.slice(0, max) + '...';
    }
    return str;
}

// <details >

//     {companies
//         .sort((a, b) =>
//             a.companyName.localeCompare(b.companyName)
//         )
//         .map(company => {
//             return (
//                 <Link
//                     key={company._id}
//                     to={`/dashboard/company/${company._id}`}
//                     className={`dashboard-nav__sublink ${
//                         window.location.pathname ===
//                             `/dashboard/company/${company._id}` ||
//                             window.location.pathname ===
//                             `/dashboard/company/${company._id}/`
//                             ? 'dashboard__link--is-active'
//                             : ''
//                         }`}
//                     onClick={() => {
//                         localStorage.setItem(
//                             'details',
//                             true
//                         );
//                         setAlert(
//                             `The ${company.companyName} settings are now desplayed on the page `,
//                             'success'
//                         );
//                     }}
//                     onMouseDown={e => e.preventDefault()}
//                 >
//                     {company.showAcronym &&
//                         company.companyAcronym
//                         ? company.companyAcronym
//                         : shortenString(
//                             company.companyName
//                         )}
//                 </Link>
//             )
//         };
//         })
// </details>
