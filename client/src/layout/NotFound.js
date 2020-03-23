import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/user';

const NotFound = ({ redirectLink, loadUser }) => {
    useEffect(() => {
        loadUser();
    }, []);
    return (
        <section className='not-found'>
            <div className='wrapper'>
                <div className='heading heading--xlg'>404</div>
                <h1 className='heading heading--lg'>Page Not Found</h1>
                <Link
                    to={redirectLink}
                    onMouseDown={e => e.preventDefault()}
                    className='not-found__link'
                >
                    <span aria-hidden='true'>&#8592; </span>
                    Go back to the site
                </Link>
                {/* <p>
                    You seem to have clicked on a broken link or entered URL
                    that doesn't exists on this site.
                </p> */}
            </div>
        </section>
    );
};
const mapStateToProps = state => ({
    redirectLink: state.global.redirectLink
});
export default connect(mapStateToProps, { loadUser })(NotFound);
