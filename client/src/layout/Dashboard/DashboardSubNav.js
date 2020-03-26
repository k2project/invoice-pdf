import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alerts';
import { setCompanyCurrentNavLink } from '../../redux/actions/companies';
import { displayCompanyName } from '../../utils/funs';

const DashboardSubNav = props => {
    let { id } = useParams();
    const { companies } = props;
    useEffect(() => {});
    return (
        <Fragment>
            {companies.length > 0 && (
                <li>
                    {companies.find(c => c._id === id) ? (
                        <details onMouseDown={e => e.preventDefault()} open>
                            <SubNavLinks {...props} id={id} />
                        </details>
                    ) : (
                        <details onMouseDown={e => e.preventDefault()}>
                            <SubNavLinks {...props} id={id} />
                        </details>
                    )}
                </li>
            )}
        </Fragment>
    );
};

DashboardSubNav.propTypes = {
    companies: PropTypes.array.isRequired,
    setAlert: PropTypes.func.isRequired,
    setCompanyCurrentNavLink: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    companies: state.companies.companies
});
export default connect(mapStateToProps, { setAlert, setCompanyCurrentNavLink })(
    DashboardSubNav
);

function SubNavLinks({ companies, setAlert, setCompanyCurrentNavLink, id }) {
    return (
        <Fragment>
            <summary className='dashboard-nav__link'>Companies</summary>
            {companies
                .sort((a, b) => a.companyName.localeCompare(b.companyName))
                .map(company => {
                    const {
                        _id,
                        companyName,
                        companyAcronym,
                        showAcronym
                    } = company;
                    return (
                        <Link
                            key={_id}
                            to={`/dashboard/company/${_id}`}
                            className={`dashboard-nav__sublink ${
                                id === _id ? 'dashboard__link--is-active' : ''
                            }`}
                            onClick={() => {
                                setCompanyCurrentNavLink('default');
                                setAlert(
                                    `The ${companyName} settings are now desplayed on the page `,
                                    'success'
                                );
                            }}
                            onMouseDown={e => e.preventDefault()}
                        >
                            {displayCompanyName(
                                companyName,
                                companyAcronym,
                                showAcronym
                            )}
                        </Link>
                    );
                })}
        </Fragment>
    );
}
