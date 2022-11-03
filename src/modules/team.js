import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as teamAPI from '../lib/api';

const [GET_MEMBER, GET_MEMBER_SUCCESS, GET_MEMBER_FAILURE] = createRequestActionTypes(
    'team/GET_MEMBER'
);

export const getMember = createAction(GET_MEMBER, t_index => t_index);

const memberSaga = createRequestSaga(GET_MEMBER, teamAPI.getTeam);

export function* teamSaga() {
    yield takeLatest(GET_MEMBER, memberSaga);
};

const initialState = {
    thisMember: [],
    nextMember: [],
    memberError: null,
}

export default handleActions(
    {
        [GET_MEMBER_SUCCESS]: (state, { payload: member }) => ({
            ...state,
            thisMember: member[0],
            nextMember: member[1],
        }),
        [GET_MEMBER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            thisMember: null,
            nextMember: null,
            memberError: error,
        }),
    },
    initialState,
);