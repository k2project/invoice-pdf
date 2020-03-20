export const formErrorsStyling = arr => {
    //when password doesnt meet required parameters and doesnt match the confirmation aria on first password gets overide by 'don't match' msg
    //uniqueErr allows to display first error msg on first password 'Password must be at least 8 characters long and must contain a number and a capital letter.'
    const uniqueErr = [];
    arr.length > 0 &&
        arr.forEach(err => {
            if (err.param) {
                if (!uniqueErr.includes(err.param)) {
                    uniqueErr.push(err.param);
                    const input = document.getElementById(err.param);
                    // console.log(err.param, input);
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
export const updateStateErrors = async (form, state, updateState, errors) => {
    if (errors) {
        await updateState({
            ...state,
            errors: [...state.errors, ...errors]
        });
        const errorsLinks = form.querySelectorAll('.form__errs a');
        if (errorsLinks.length > 0) errorsLinks[0].focus();
    }
};

export const sanitize = string => {
    const map = {
        // '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
        // '"': '&quot;',
        // "'": '&#x27;',
        // '/': '&#x2F;'
    };
    const reg = /[<>]/gi;
    // const reg = /[&<>"'/]/gi;
    return string.replace(reg, match => map[match]);
};

export const cleanData = async state => {
    Object.keys(state).forEach(function(item) {
        if (typeof state[item] === 'string')
            state[item] = sanitize(state[item].trim());
    });
};
export const objHasAllPropertyEmpty = obj => {
    let res = true;
    if (Object.values(obj).length > 0) {
        Object.values(obj).forEach(value => {
            if (value) {
                res = false;
                return;
            }
            res = true;
        });
    }
    return res;
};

export const dialogBox = async (msg, cb) => {
    const exist = document.getElementById('dialog-box');
    if (!exist) {
        let box = document.createElement('div');
        box.setAttribute('id', 'dialog-box');
        box.setAttribute('role', 'dialog');
        // box.setAttribute('aria-labelledby', 'dialog-header');
        box.setAttribute('aria-describedby', 'dialog-body');
        box.className = 'dialog-box';
        box.innerHTML = `
            <div class="dialog-box__header" id="dialog-header">Confirm Dialog</div>
            <div class="dialog-box__body" id="dialog-body">
                <span class="sr-only">Confirm dialog. </span>
                ${msg}
            </div>
            <div class="dialog-box__footer" >
                <button class="btn btn--grey btn--small btn--sibling" id="dialog-cancel">Close</button>
                <button class="btn btn--danger btn--small" id="dialog-confirm"> OK </button>
            </div>
        `;
        document.body.append(box);
    }
    document.addEventListener('click', cancelDialog);
    document.addEventListener('click', confirmDialog);
    document.addEventListener('mousedown', mouseDownOnDialogBtns);

    function cancelDialog(e) {
        if (e.target.getAttribute('id') === 'dialog-cancel') {
            removeEvents();
            closeDialog();
        }
    }
    function confirmDialog(e) {
        if (e.target.getAttribute('id') === 'dialog-confirm') {
            cb();
            removeEvents();
            closeDialog();
        }
    }
    function mouseDownOnDialogBtns(e) {
        if (
            e.target.getAttribute('id') === 'dialog-confirm' ||
            e.target.getAttribute('id') === 'dialog-cancel'
        ) {
            e.preventDefault();
        }
    }
    function removeEvents() {
        document.removeEventListener('click', cancelDialog);
        document.removeEventListener('click', confirmDialog);
        document.removeEventListener('mousedown', mouseDownOnDialogBtns);
    }
    function closeDialog() {
        document.getElementById('dialog-box').remove();
    }
};
