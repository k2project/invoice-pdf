import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setAlert } from '../../../../../redux/actions/alerts';
import { getCurrentProfile } from '../../../../../redux/actions/profile';
import axios from 'axios';

import {
    displayCurrentLink,
    displayCompany,
    updateCompany,
    deleteCompany,
    invoiceCompany
} from '../../../../../redux/actions/dasboard';

const Company = ({
    companies,
    setAlert,
    dashboard: { currentNavLink, companyToDisplay, companyToUpdate },
    displayCurrentLink,
    displayCompany,
    updateCompany,
    deleteCompany,
    invoiceCompany
}) => {
    // const company = companies.find(c => c._id === companyToDisplay);
    // let { companyName } = company;

    return (
        <section>
            <h2>
                <span className='sr-only'>Company's setting for </span>
                {/* {companyName} */}
            </h2>

            <button onClick={invoiceCompany}>Create Invoice</button>
            <button onClick={updateCompany}>Update Company</button>
            <button onClick={() => deleteCompany(companyToDisplay)}>
                Delete Company
            </button>
        </section>
    );
};

Company.propTypes = {};

const mapStateToProps = state => ({
    companies: state.profile.profile.companies,
    dashboard: state.dashboard
});
export default connect(mapStateToProps, {
    setAlert,
    getCurrentProfile,
    displayCurrentLink,
    displayCompany,
    updateCompany,
    deleteCompany,
    invoiceCompany
})(Company);
// const Company = ({ id, companyUpdate, companies, companyDelete, setAlert }) => {
//     const company = companies.find(c => c._id === id);
//     let { companyName } = company;
//     async function deleteCompany() {
//         try {
//             await axios.delete(`/api/profile/company/${id}`);
//             getCurrentProfile();
//             setAlert('Company deleted successfully.', 'success', null, false);
//             companyDelete();
//         } catch (err) {
//             console.log(err);
//         }
//     }
//     useEffect(() => {
//         // getCurrentProfile();
//     }, []);
//     return (
//         <section>
//             <h2>
//                 <span className='sr-only'>Company's setting for </span>
//                 {companyName}
//             </h2>

//             <button onClick={() => companyUpdate('new-invoice-form')}>
//                 Create Invoice
//             </button>
//             <button onClick={() => companyUpdate('add-company-form')}>
//                 Update Company
//             </button>
//             <button onClick={deleteCompany}>Delete Company</button>
//         </section>
//     );
// };

// Company.propTypes = {};

// const mapStateToProps = state => ({
//     companies: state.profile.profile.companies
// });
// export default connect(mapStateToProps, { setAlert })(Company);
