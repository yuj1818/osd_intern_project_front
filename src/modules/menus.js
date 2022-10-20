const CHANGE_INPUT = 'menus/CHANGE_INPUT';
const INSERT = 'menus/INSERT';
const MENU_LIKE = 'menus/MENU_LIKE'

export const changeInput = input => ({
    type: CHANGE_INPUT,
    input
});

export const insert = text => ({
    type: INSERT,
    text
});

export const menuLike = like => ({
    type: MENU_LIKE,
    like
})

const initialState = {
    input: '',
    text: '',
    like: false,
};

function menus(state = initialState, action) {
    switch (action.type) {
        case CHANGE_INPUT:
            return {
                ...state,
                input: action.input
            };
        case INSERT:
            return {
                ...state,
                text: action.text
            };
        case MENU_LIKE:
            return {
                ...state,
                like: !state.like
            }
        default:
            return state;
    }
}

export default menus;