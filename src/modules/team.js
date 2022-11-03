import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as teamAPI from '../lib/api';
import { startLoading, finishLoading } from "../modules/loading";

const [GET_NEXT_MEMBER, GET_NEXT_MEMBER_SUCCESS, GET_NEXT_MEMBER_FAILURE] = createRequestActionTypes(
    'team/GET_NEXT_MEMBER'
);

const [GET_THIS_MEMBER, GET_THIS_MEMBER_SUCCESS, GET_THIS_MEMBER_FAILURE] = createRequestActionTypes(
    'team/GET_THIS_MEMBER'
);

export const getNextMember = createAction(GET_NEXT_MEMBER, t_index => t_index);

export const getThisMember = createAction(GET_THIS_MEMBER, t_index => t_index);

const nextMemberSaga = createRequestSaga(GET_NEXT_MEMBER, teamAPI.getTeam);

const thisMemberSaga = createRequestSaga(GET_THIS_MEMBER, teamAPI.getTeam);

export function* teamSaga() {
    yield takeLatest(GET_THIS_MEMBER, thisMemberSaga);
    yield takeLatest(GET_NEXT_MEMBER, nextMemberSaga);
};

const initialState = {
    thisMember: [],
    nextMember: [],
    memberError: null,
}

export default handleActions(
    {
        [GET_THIS_MEMBER_SUCCESS]: (state, { payload: member }) => ({
            ...state,
            thisMember: member[0],
        }),
        [GET_THIS_MEMBER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            thisMember: null,
            memberError: error,
        }),
        [GET_NEXT_MEMBER_SUCCESS]: (state, { payload: member }) => ({
            ...state,
            nextMember: member[1],
        }),
        [GET_NEXT_MEMBER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            nextMember: null,
            memberError: error,
        }),
    },
    initialState,
);