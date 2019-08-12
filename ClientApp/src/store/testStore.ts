import { Reducer, Action, ActionCreator } from "redux";
import { TypedThunkAction, ApiCallAction, startApiCallAction, succeededApiCallAction, failedApiCallAction, ApiCallActionStatus } from "./actions";
import { ApiCallService } from '../services/apiCallService';

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
    CLEAR_DATA = "CLEAR_DATA"
}

interface FetchDataAction extends ApiCallAction<ActionTypes.FETCH_DATA, string> { };

export interface FetchDataThunkAction extends TypedThunkAction<FetchDataAction> { };
export interface ClearDataAction extends Action<ActionTypes.CLEAR_DATA> { };

export type AcceptedAction = ClearDataAction | FetchDataAction;

// HELPER FUNCTIONS

// ACTION CREATORS
export const clearDataAction: ActionCreator<ClearDataAction> = () => ({ type: ActionTypes.CLEAR_DATA });
export const fetchDataAction: ActionCreator<FetchDataThunkAction> = () => async (dispatch, getState) => {    
    if (getState().test.isLoading) { return; }

    try{
        dispatch(startApiCallAction<ActionTypes.FETCH_DATA>(ActionTypes.FETCH_DATA) as any);
        const apiResponseData = await ApiCallService.fetchData();
        dispatch(succeededApiCallAction<ActionTypes.FETCH_DATA, string>(ActionTypes.FETCH_DATA, apiResponseData));
    }
    catch(error){ 
        dispatch(failedApiCallAction<ActionTypes.FETCH_DATA>(ActionTypes.FETCH_DATA, error.message)); 
    }
};

// REDUCER
export const reducer: Reducer<State> = (state: State = unloadedState, incomingAction?: Action) => {
    const action = incomingAction as AcceptedAction;
    switch (action.type) {
        case ActionTypes.FETCH_DATA:
            return action.status === ApiCallActionStatus.SUCCEEDED 
                ? {
                    ...state,
                    isLoading: false,
                    apiResponses: [...state.apiResponses, action.payload]
                }
                : {
                    ...state,
                    isLoading: action.status === ApiCallActionStatus.STARTED,
                    errorMessage: action.error
                }
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