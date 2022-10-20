const TOGGLE = 'days/TOGGLE';

export const toggle = id => ({
    type: TOGGLE,
    id
});

const initialState = {
    days: [
        {
            id: 1,
            text: "월요일",
            checked: true,
        },
        {
            id: 2,
            text: "화요일",
            checked: true,
        },
        {
            id: 3,
            text: "수요일",
            checked: true,
        },
        {
            id: 4,
            text: "목요일",
            checked: true,
        },
        {
            id: 5,
            text: "금요일",
            checked: true,
        }
    ]
};

function days(state = initialState, action) {
    switch (action.type) {
        case TOGGLE:
            return {
                ...state,
                days: state.days.map(day =>
                    day.id === action.id ? { ...day, checked: !day.checked } : day
                )
            };
        default:
            return state;
    }
}

export default days;