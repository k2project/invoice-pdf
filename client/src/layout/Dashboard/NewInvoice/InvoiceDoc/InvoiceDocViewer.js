import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';
import { PDFViewer } from '@react-pdf/renderer';
import InvoiceDoc from './InvoiceDoc';

const InvoiceDocViewer = props => {
    const vieweStyle = {
        width: '700px',
        border: 'none',
        backgroundColor: '#fff',
        height: '100%'
    };
    return (
        <PDFViewer style={vieweStyle}>
            <Provider store={store}>
                <InvoiceDoc />
            </Provider>
        </PDFViewer>
    );
};

InvoiceDocViewer.propTypes = {};

export default InvoiceDocViewer;
