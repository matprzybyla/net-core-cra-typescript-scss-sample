import { Reducer, Action, ActionCreator } from "redux";
import axios, { AxiosResponse } from 'axios';
import { ThunkAction } from "redux-thunk";

// STATE
export interface State {
    apiResponses: string[],
    isLoading: boolean,
    errorMessage?: string
}

export const unloadedState: State = {
    apiResponses: [],
    isLoading: false,
    errorMessage: undefined
};

// ACTIONS
export enum ActionTypes {
    FETCH_DATA = "FETCH_DATA",
    START_FETCH_DATA = "START_FETCH_DATA",
    ERROR_FETCH_DATA = "ERROR_FETCH_DATA",
    SUCCESS_FETCH_DATA = "SUCCESS_FETCH_DATA",
    CLEAR_DATA = "CLEAR_DATA",
}

export interface FetchDataAction extends ThunkAction<Promise<void>, State, void, AcceptedAction> { };
interface StartFetchDataAction extends Action<ActionTypes.START_FETCH_DATA> { };
interface ErrorFetchDataAction extends Action<ActionTypes.ERROR_FETCH_DATA> { payload: string };
interface SuccessFetchDataAction extends Action<ActionTypes.SUCCESS_FETCH_DATA> { payload: string };
export interface ClearDataAction extends Action<ActionTypes.CLEAR_DATA> { };
export type AcceptedAction = StartFetchDataAction | ErrorFetchDataAction | SuccessFetchDataAction | ClearDataAction;

// HELPER FUNCTIONS
//..

// ACTION CREATORS
export const fetchDataAction: ActionCreator<FetchDataAction> = () => async (dispatch, getState) => {
    if (getState().isLoading) {
        // do nothing while loading
        return;
    }

    dispatch(({ type: ActionTypes.START_FETCH_DATA }));
    axios.get('/api/test')
        .then(function (response: AxiosResponse<string>) {
            console.log(response);
            dispatch(({ type: ActionTypes.SUCCESS_FETCH_DATA, payload: response.data }));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(({ type: ActionTypes.ERROR_FETCH_DATA, payload: error.message }));
        })
};
export const clearDataAction: ActionCreator<ClearDataAction> = () => ({ type: ActionTypes.CLEAR_DATA });

// REDUCER
export const reducer: Reducer<State> = (state: State = unloadedState, incomingAction?: Action) => {
    const action = incomingAction as AcceptedAction;
    switch (action.type) {
        case ActionTypes.START_FETCH_DATA:
            return {
                ...state,
                isLoading: true,
                errorMessage: undefined
            };
        case ActionTypes.ERROR_FETCH_DATA:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            };
        case ActionTypes.SUCCESS_FETCH_DATA:
            return {
                isLoading: false,
                apiResponses: [...state.apiResponses, action.payload ]
            };
        case ActionTypes.CLEAR_DATA:
            return {
                isLoading: false,
                apiResponses: [],
                errorMessage: undefined
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state;
};