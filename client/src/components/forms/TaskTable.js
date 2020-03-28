import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alerts';
import {
    getAllCompanies,
    setTaskToUpdate,
    deleteTaskAndClearForm
} from '../../redux/actions/companies';

import updateIcon from '../../imgs/icons/updateIcon.png';
import deleteIcon from '../../imgs/icons/deleteIcon.png';

const TaskTable = ({
    companies,
    setAlert,
    getAllCompanies,
    setTaskToUpdate,
    deleteTaskAndClearForm
}) => {
    let { id } = useParams();
    const company = companies.find(c => c._id === id);
    const { tasks } = company;
    const addToNextInvoiceExist = tasks.find(task => task.addToNextInvoice);

    const toggleTaskInvoiceDisplay = async (taskId, task) => {
        try {
            await axios.put(`/api/company/tasks/invoice-display/${taskId}`, {
                data: { company: company._id, task }
            });
            getAllCompanies();
            setAlert(
                `Task has been updated successfully.`,
                'success',
                null,
                false
            );
        } catch (err) {
            console.log(err);
        }
    };
    const deleteTask = async taskId => {
        setTaskToUpdate(null);
        deleteTaskAndClearForm();
        Array.from(document.querySelectorAll('.task-table tr')).map(
            tr => (tr.style.opacity = 1)
        );
        try {
            await axios.delete(`/api/company/tasks/${taskId}`, {
                data: { company: company._id }
            });
            getAllCompanies();
            setAlert('Task deleted successfully.', 'success', null, false);
        } catch (err) {
            console.log(err);
        }
    };
    const updateTask = (e, taskId) => {
        const td = e.target.closest('td');
        Array.from(document.querySelectorAll('.task-table tr')).map(tr => {
            tr !== td.parentElement
                ? (tr.style.opacity = 0.2)
                : (tr.style.opacity = 1);
        });
        document.getElementById('taskDesc').focus();
        setTaskToUpdate(taskId);
    };
    return (
        <table className='task-table'>
            <caption className='sr-only'>
                Company current tasks list and controls (update, delete or add
                to the new invoice).
            </caption>
            <thead>
                <tr className='sr-only'>
                    <th scope='col'>Add task to a new invoice</th>
                    <th scope='col'>Task description</th>
                    <th scope='col'>Quantity/Item</th>
                    <th scope='col'>Rate</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'>Update Task</th>
                    <th scope='col'>Delete Task</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => {
                    let {
                        _id,
                        taskDesc,
                        taskQty,
                        taskRate,
                        taskAmount,
                        addToNextInvoice
                    } = task;
                    return (
                        <tr key={_id}>
                            <td
                                onClick={() => {
                                    task.addToNextInvoice = !addToNextInvoice;
                                    toggleTaskInvoiceDisplay(_id, task);
                                }}
                            >
                                <button
                                    onMouseDown={e => e.preventDefault()}
                                    className='task-table__btn'
                                    title={`Task to be${
                                        addToNextInvoice ? ' ' : ' NOT '
                                    }included in a new invoice`}
                                >
                                    {addToNextInvoice ? (
                                        <b>&#43;</b>
                                    ) : (
                                        <b>&#45;</b>
                                    )}
                                </button>
                            </td>
                            <th scope='row'>{taskDesc}</th>
                            <td>{taskQty}</td>
                            <td>{taskRate}</td>
                            <td>{taskAmount}</td>
                            <td
                                className='task-update'
                                onClick={e => updateTask(e, _id)}
                            >
                                <button
                                    onMouseDown={e => e.preventDefault()}
                                    className='task-table__btn'
                                    title='Update Task'
                                >
                                    <img
                                        src={updateIcon}
                                        className='task-table__icon '
                                        alt=''
                                    />
                                    <span className='sr-only'>Update Task</span>
                                </button>
                            </td>
                            <td
                                className='task-delete'
                                onClick={() => deleteTask(_id)}
                            >
                                <button
                                    onMouseDown={e => e.preventDefault()}
                                    className='task-table__btn'
                                    title='Delete Task'
                                >
                                    <img
                                        src={deleteIcon}
                                        className='task-table__icon'
                                        alt=''
                                    />
                                    <span className='sr-only'>Delete Task</span>
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            {addToNextInvoiceExist && (
                <tfoot>
                    <tr>
                        <td colSpan='7'>
                            <Link
                                to={{
                                    pathname: '/dashboard/new-invoice',
                                    search: `?${company._id}`
                                }}
                            >
                                Create a new invoice with selected tasks.
                            </Link>
                        </td>
                    </tr>
                </tfoot>
            )}
        </table>
    );
};

TaskTable.propTypes = {
    companies: PropTypes.array.isRequired,
    setAlert: PropTypes.func.isRequired,
    getAllCompanies: PropTypes.func.isRequired,
    setTaskToUpdate: PropTypes.func.isRequired,
    deleteTaskAndClearForm: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    companies: state.companies.companies
});
export default connect(mapStateToProps, {
    setAlert,
    getAllCompanies,
    setTaskToUpdate,
    deleteTaskAndClearForm
})(TaskTable);
