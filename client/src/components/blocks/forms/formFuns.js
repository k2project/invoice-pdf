export const formErrorsStyling = arr => {
    arr.length > 0 &&
        arr.forEach(err => {
            if (err.param)
                document
                    .getElementById(err.param)
                    .classList.add('form__input--err');
        });
};
export const inputOnChange = (e, state, stateUpdate) => {
    const name = e.target.name;
    //remove errors styling related to the input
    //empty errors array
    e.target.classList.remove('form__input--err');
    const errors = state.errors.filter(err => err.param !== name);
    stateUpdate({
        ...state,
        [name]: e.target.value,
        errors
    });
};
