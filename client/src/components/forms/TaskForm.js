import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import FormErrorsDisplay from './FormErrorsDisplay';
import FormInput from './FormInput';
import { updateStateErrors, cleanData } from './formFuns';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alerts';
import {
    getAllCompanies,
    setTaskToUpdate
} from '../../redux/actions/companies';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function TaskForm({
    companies: { companies, taskToUpdate, taskDeleted },
    setAlert,
    getAllCompanies,
    setTaskToUpdate
}) {
    const [formData, setFormData] = useState({
        taskDesc: '',
        taskQty: '',
        taskRate: '',
        taskAmount: '',
        addToNextInvoice: true,
        errors: []
    });

    let { id } = useParams();
    const company = companies.find(c => c._id === id);
    const clearState = () => {
        setFormData({
            taskDesc: '',
            taskQty: '',
            taskRate: '',
            taskAmount: '',
            addToNextInvoice: true,
            errors: []
        });
    };
    async function onSubmit(e) {
        e.preventDefault();
        const form = e.target;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            await cleanData(formData);
            const _id = taskToUpdate ? taskToUpdate : uuidv4();
            const body = JSON.stringify({
                _id,
                company: company._id,
                ...formData
            });

            if (taskToUpdate) {
                //update task
                await axios.put(
                    `/api/company/tasks/${taskToUpdate}`,
                    body,
                    config
                );
                Array.from(document.querySelectorAll('.task-table tr')).map(
                    tr => (tr.style.opacity = 1)
                );
                setTaskToUpdate(null);
            } else {
                //add a new task
                await axios.post('/api/company/tasks', body, config);
            }

            getAllCompanies();
            let alertMsg = taskToUpdate
                ? 'Task has been updated successfully.'
                : 'A new task has been added to the list.';
            setAlert(alertMsg, 'success', null, false);
            await clearState();
        } catch (err) {
            console.log('TASK FORM ERR');
            console.log(err);
            if (err.response) {
                updateStateErrors(
                    form,
                    formData,
                    setFormData,
                    err.response.data.errors
                );
            }
        }
    }

    useEffect(() => {
        if (taskToUpdate) {
            const task = company.tasks.find(task => task._id === taskToUpdate);
            if (task) {
                setFormData({
                    taskDesc: task.taskDesc || '',
                    taskQty: task.taskQty || '',
                    taskRate: task.taskRate || '',
                    taskAmount: task.taskAmount || '',
                    addToNextInvoice: task.addToNextInvoice,
                    errors: []
                });
            } else {
                setTaskToUpdate(null);
                clearState();
            }
        }
    }, [taskToUpdate, company]);
    // clear form on task deletion
    // when user changes mind to delete over update task
    useEffect(() => {
        if (taskDeleted) {
            clearState();
        }
    }, [taskDeleted]);

    return (
        <form onSubmit={onSubmit} className='form-task'>
            <fieldset>
                <legend>Add a new task</legend>
                <div className='form-of-4'>
                    <div>
                        <FormInput
                            form={{ formData, setFormData }}
                            name='taskDesc'
                            size='auto'
                        >
                            Description
                        </FormInput>
                    </div>
                    <div>
                        <FormInput
                            form={{ formData, setFormData }}
                            name='taskQty'
                            size='auto'
                        >
                            Qty
                        </FormInput>
                    </div>
                    <div>
                        <FormInput
                            form={{ formData, setFormData }}
                            name='taskRate'
                            size='auto'
                        >
                            Rate
                        </FormInput>
                    </div>
                    <div>
                        <FormInput
                            form={{ formData, setFormData }}
                            name='taskAmount'
                            size='auto'
                        >
                            Amount
                        </FormInput>
                    </div>
                </div>
            </fieldset>

            {formData.errors.length > 0 && (
                <FormErrorsDisplay errors={formData.errors} label='tasks' />
            )}
            <button
                type='submit'
                className='btn btn--info'
                onClick={onSubmit}
                onMouseDown={e => e.preventDefault()}
            >
                Submit
            </button>
        </form>
    );
}

TaskForm.propTypes = {
    setAlert: PropTypes.func.isRequired,
    getAllCompanies: PropTypes.func.isRequired,
    setTaskToUpdate: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    companies: state.companies
});
export default connect(mapStateToProps, {
    setAlert,
    getAllCompanies,
    setTaskToUpdate
})(TaskForm);
