import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import TaskForm from '../../../components/forms/TaskForm';

const CompanyTasks = ({ companies }) => {
    let { id } = useParams();
    const company = companies.find(c => c._id === id);
    return (
        <section className='dashboard__section company-tasks'>
            <h3 className='sr-only' id='company-tasks'>
                Company's Tasks
            </h3>

            {company.tasks.length === 0 && (
                <p>
                    {' '}
                    There is no tasks for <b>{company.companyName}</b> saved
                    yet. Feel free to add some now.{' '}
                </p>
            )}
            {company.tasks && (
                <ul aria-label='company-tasks-list' className='company-details'>
                    {company.tasks.map(task => {
                        return <li>{task.desc}</li>;
                    })}
                </ul>
            )}
            {/* <TaskForm /> */}
        </section>
    );
};

CompanyTasks.propTypes = {
    companies: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    companies: state.companies.companies
});
export default connect(mapStateToProps)(CompanyTasks);
