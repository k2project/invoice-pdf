import React, { useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/user';

const NotFound = ({ redirectLink, companyDeleted, loadUser }) => {
    // useEffect(() => {
    //     loadUser();
    // }, [loadUser]);
    return (
        <Fragment>
            {companyDeleted && <Redirect to='/dashboard/add-company' />}
            {!companyDeleted && (
                <section className='not-found'>
                    <div className='wrapper'>
                        <div className='heading heading--xlg'>404</div>
                        <h1 className='heading heading--lg'>
                            {/^\/dashboard\/company/.test(
                                window.location.pathname
                            )
                                ? 'Comapny '
                                : 'Page '}{' '}
                            Not Found
                        </h1>
                        <Link
                            to={redirectLink}
                            onMouseDown={e => e.preventDefault()}
                            className='not-found__link'
                        >
                            <span aria-hidden='true'>&#8592; </span>
                            Go back to the site
                        </Link>
                    </div>
                </section>
            )}
        </Fragment>
    );
};
const mapStateToProps = state => ({
    companyDeleted: state.companies.companyDeleted,
    redirectLink: state.global.redirectLink
});
export default connect(mapStateToProps, { loadUser })(NotFound);
