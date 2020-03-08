import { Reducer, Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import axios, { AxiosResponse } from 'axios';

// STATE
export interface State {
    isLoading: boolean,
    errorMessage?: string,
    response: string | undefined
}

export const unloadedState: State = {
    isLoading: false,
    errorMessage: undefined,
    response: undefined
};

// ACTIONS
export enum ActionTypes {
    FETCH_SECURED_DATA = "FETCH_SECURED_DATA",
    START_FETCH_SECURED_DATA = "START_FETCH_SECURED_DATA",
    ERROR_FETCH_SECURED_DATA = "ERROR_FETCH_SECURED_DATA",
    SUCCESS_FETCH_SECURED_DATA = "SUCCESS_FETCH_SECURED_DATA",
    CLEAR_SECURED_DATA = "CLEAR_SECURED_DATA",
}

export interface FetchDataAction extends ThunkAction<Promise<void>, State, void, AcceptedAction> { };
interface StartFetchDataAction extends Action<ActionTypes.START_FETCH_SECURED_DATA> { };
interface ErrorFetchDataAction extends Action<ActionTypes.ERROR_FETCH_SECURED_DATA> { payload: string };
interface SuccessFetchDataAction extends Action<ActionTypes.SUCCESS_FETCH_SECURED_DATA> { payload: string };
export interface ClearSecuredDataAction extends Action<ActionTypes.CLEAR_SECURED_DATA> { };
export type AcceptedAction = StartFetchDataAction | ErrorFetchDataAction | SuccessFetchDataAction | ClearSecuredDataAction;

// HELPER FUNCTIONS
//..

// ACTION CREATORS
export const fetchSecuredDataAction: ActionCreator<FetchDataAction> = (secret?: string) => async (dispatch, getState) => {
    if (getState().isLoading) {
        // do nothing while loading
        return;
    }

    dispatch(({ type: ActionTypes.START_FETCH_SECURED_DATA }));

    // saqmple TS 3.7+ feature
    axios.get('/api/testsecure', { 'headers': { 'key': secret ?? "NO_SECRET_KEY_PROVIDED" } })
        .then(function (response: AxiosResponse<string>) {
            console.log(response);
            dispatch(({ type: ActionTypes.SUCCESS_FETCH_SECURED_DATA, payload: response.data }));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(({ type: ActionTypes.SUCCESS_FETCH_SECURED_DATA, payload: error.message }));
        })
};
export const clearSecuredDataAction: ActionCreator<ClearSecuredDataAction> = () => ({ type: ActionTypes.CLEAR_SECURED_DATA });

// REDUCER
export const reducer: Reducer<State> = (state: State = unloadedState, incomingAction?: Action) => {
    const action = incomingAction as AcceptedAction;
    switch (action.type) {
        case ActionTypes.START_FETCH_SECURED_DATA:
            return {
                ...state,
                isLoading: true,
                errorMessage: undefined
            };
        case ActionTypes.ERROR_FETCH_SECURED_DATA:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            };
        case ActionTypes.SUCCESS_FETCH_SECURED_DATA:
            return {
                isLoading: false,
                response: action.payload
            };
        case ActionTypes.CLEAR_SECURED_DATA:
            return { ...state, response: undefined }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state;
};