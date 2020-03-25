import React from 'react';
import PropTypes from 'prop-types';
import './Company.scss';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const CompanyDetails = ({ companies }) => {
    let { id } = useParams();
    const company = companies.find(c => c._id === id);
    let {
        companyName,
        companyAcronym,
        showAcronym,
        addressLine1,
        addressLine2,
        town,
        county,
        postcode,
        email,
        website,
        mobile,
        fax,
        bankName,
        bankSortCode,
        bankAccount,
        companyInfo
    } = company;
    const companyAddress = [addressLine1, addressLine2, town, county, postcode];
    return (
        <section className='dashboard__section'>
            <h3 className='sr-only' id='company-details'>
                Company Details
            </h3>
            <ul arialabelledby='company-details' className='company-details'>
                {companyName && (
                    <li>
                        <span>Company's Name:</span>
                        <span>{companyName}</span>
                    </li>
                )}
                {companyAcronym && (
                    <li>
                        <span>Company Acronym:</span>
                        <span>
                            {companyAcronym}
                            {companyAcronym && showAcronym && <sup>*</sup>}
                        </span>
                    </li>
                )}

                {companyAcronym && showAcronym && (
                    <li>
                        <span></span>
                        <span className='company-details__acronym'>
                            *To be displayed in menus over the full name.
                        </span>
                    </li>
                )}

                {companyAddress.filter(el => el).length > 0 && (
                    <li className='company-details__address'>
                        <span>Address:</span>
                        <span>
                            {companyAddress
                                .filter(el => el)
                                .join('\n')
                                .slice(0, -1)}
                        </span>
                    </li>
                )}

                {email && (
                    <li>
                        <span>Email:</span>
                        <span>{email}</span>
                    </li>
                )}
                {mobile && (
                    <li>
                        <span>Tel/Mobile:</span>
                        <span>{mobile}</span>
                    </li>
                )}
                {fax && (
                    <li>
                        <span>Fax:</span>
                        <span>{fax}</span>
                    </li>
                )}
                {website && (
                    <li>
                        <span>Website:</span>
                        <span>{website}</span>
                    </li>
                )}

                <ul aria-label='bank details' className='company-details__bank'>
                    {bankName && (
                        <li>
                            <span>Bank Name:</span>
                            <span>{bankName}</span>
                        </li>
                    )}
                    {bankSortCode && (
                        <li>
                            <span>Sort Code:</span>
                            <span>{bankSortCode}</span>
                        </li>
                    )}
                    {bankAccount && (
                        <li>
                            <span>Account Number:</span>
                            <span>{bankAccount}</span>
                        </li>
                    )}
                </ul>
                {companyInfo && (
                    <li className='company-details__info'>
                        <span>Notes :</span>
                        <span>{companyInfo}</span>
                    </li>
                )}
            </ul>
        </section>
    );
};

CompanyDetails.propTypes = {
    companies: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    companies: state.profile.profile.companies
});
export default connect(mapStateToProps)(CompanyDetails);
