import React from 'react';
import PropTypes from 'prop-types';
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
                    const {
                        _id,
                        taskDesc,
                        taskQty,
                        taskRate,
                        taskAmount
                    } = task;
                    return (
                        <tr key={_id}>
                            <td></td>
                            <th scope='row'>{taskDesc}</th>
                            <td>{taskQty}</td>
                            <td>{taskRate}</td>
                            <td>{taskAmount}</td>
                            <td
                                className='task-update'
                                onClick={e => updateTask(e, _id)}
                            >
                                <button onClick={e => updateTask(e, _id)}>
                                    <img
                                        src={updateIcon}
                                        className='task-table__icon '
                                        alt=''
                                    />
                                    <span className='sr-only'>Update Task</span>
                                </button>
                            </td>
                            <td className='task-delete'>
                                <button onClick={() => deleteTask(_id)}>
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
