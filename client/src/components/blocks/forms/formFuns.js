export const formErrorsStyling = arr => {
    //when password doesnt meet required parameters and doesnt match the confirmation aria on first password gets overide by 'don't match' msg
    //uniqueErr allows to display first error msg on first password 'Password must be at least 8 characters long and must contain a number and a capital letter.'
    const uniqueErr = [];
    arr.length > 0 &&
        arr.forEach(err => {
            console.log(err);
            if (err.param) {
                if (!uniqueErr.includes(err.param)) {
                    uniqueErr.push(err.param);
                    const input = document.getElementById(err.param);
                    input.classList.add('form__input--err');
                    input.setAttribute('aria-label', `Error:${err.msg}`);
                }
            }
        });
};
export const inputOnChange = (e, state, stateUpdate) => {
    const name = e.target.name;
    //remove errors styling related to the input
    //empty errors array
    e.target.classList.remove('form__input--err');
    e.target.removeAttribute('aria-label');
    const errors = state.errors.filter(err => err.param !== name);
    stateUpdate({
        ...state,
        [name]: e.target.value,
        errors
    });
};
export const updateStateErrors = async (state, updateState, errors) => {
    if (errors) {
        await updateState({
            ...state,
            errors: [...state.errors, ...errors]
        });
        const errorsLinks = document.querySelectorAll('.form__errs a');
        if (errorsLinks.length > 0) errorsLinks[0].focus();
    }
};
