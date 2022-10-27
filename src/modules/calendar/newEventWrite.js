const CHANGE_FIELD = 'NewEventWrite/CHANGE_FILED';
const INITIALIZE = 'NewEventWrite/INITIALIZE';

export const changeField = ({_key, _value}) => ({ type : CHANGE_FIELD, _key, _value })
export const initialize = () => ({ type : INITIALIZE});

const initialState = {
    newEventData : {
        title : '',
        category : '',
        startDate : '',
        endDate : ''
    },
}

export default function newEventWrite (state = initialState, action) {
    switch (action.type) {
        case CHANGE_FIELD :
            return  {
                ...state,
                newEventData: {
                    ...state.newEventData,
                    [action._key] : action._value
                }
            }

        case INITIALIZE :
            return {
                ...state,
                newEventData: initialState.newEventData
            }
        default:
            return state;
    }
}
