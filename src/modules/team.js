import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as teamAPI from '../lib/api';

const [GET_MEMBER, GET_MEMBER_SUCCESS, GET_MEMBER_FAILURE] = createRequestActionTypes(
    'team/GET_MEMBER'
);
const [GET_THISWEEKIDX, GET_THISWEEKIDX_SUCCESS, GET_THISWEEKIDX_FAILURE] = createRequestActionTypes(
    'team/GET_THISWEEKIDX'
);

export const getMember = createAction(GET_MEMBER, t_index => t_index);

export const getThisWeekIdx = createAction(GET_THISWEEKIDX, m_num => m_num);

const memberSaga = createRequestSaga(GET_MEMBER, teamAPI.getTeam);

const thisWeekIdxSaga = createRequestSaga(GET_THISWEEKIDX, teamAPI.getThisWeekIdx);

export function* teamSaga() {
    yield takeLatest(GET_MEMBER, memberSaga);
    yield takeLatest(GET_THISWEEKIDX, thisWeekIdxSaga);
};

const initialState = {
    thisMember: [],
    nextMember: [],
    memberError: null,
    thisWeekIdx: null,
    idxError: null,
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
        [GET_THISWEEKIDX_SUCCESS]: (state, { payload: thisWeekIdx }) => ({
            ...state,
            thisWeekIdx: thisWeekIdx[0].t_index,
        }),
        [GET_THISWEEKIDX_FAILURE]: (state, { payload: error }) => ({
            ...state,
            thisWeekIdx: null,
            idxError: error,
        }),
    },
    initialState,
);