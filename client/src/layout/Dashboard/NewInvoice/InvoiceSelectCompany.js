import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const InvoiceSelectCompany = ({ companies }) => {
    return (
        <div className='invoice-select'>
            <div className='dashboard__heading'>
                <h3 className='heading heading--sm' id='invoice-select'>
                    Select a company to start on your invoice.
                </h3>
            </div>
            <div className='dashboard__section'>
                <ul aria-labelledby='invoice-select'>
                    {companies
                        .sort((a, b) =>
                            a.companyName.localeCompare(b.companyName)
                        )
                        .map(c => (
                            <Link
                                key={'select-company-' + c._id}
                                className='invoice-select__link'
                                to={{
                                    pathname: '/dashboard/new-invoice',
                                    search: `?${c._id}`
                                }}
                            >
                                {c.companyName}
                            </Link>
                        ))}
                </ul>
                <p>
                    In order to start a new invoice you need to provide
                    company's information.{' '}
                </p>
                <Link to='/dashboard/add-company'>
                    Create a new company's profile now.
                </Link>{' '}
            </div>
        </div>
    );
};

InvoiceSelectCompany.propTypes = {
    companies: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    companies: state.companies.companies
});
export default connect(mapStateToProps)(InvoiceSelectCompany);
