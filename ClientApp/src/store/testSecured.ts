import { Reducer, Action, ActionCreator } from "redux";
import { TypedThunkAction, ApiCallAction, startApiCallAction, succeededApiCallAction, failedApiCallAction, ApiCallActionStatus } from "./actions";
import { ApiCallService } from '../services/apiCallService';

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
    CLEAR_SECURED_DATA = "CLEAR_SECURED_DATA"
}

interface FetchDataAction extends ApiCallAction<ActionTypes.FETCH_SECURED_DATA, string> { };
export interface FetchDataThunkAction extends TypedThunkAction<FetchDataAction> { };
export interface ClearDataAction extends Action<ActionTypes.CLEAR_SECURED_DATA> { };
export type AcceptedAction = ClearDataAction | FetchDataAction;

// HELPER FUNCTIONS

// ACTION CREATORS
export const clearSecuredDataAction: ActionCreator<ClearDataAction> = () => ({ type: ActionTypes.CLEAR_SECURED_DATA });
export const fetchSecuredDataAction: ActionCreator<FetchDataThunkAction> = (secret?: string) => async (dispatch, getState) => {
    if (getState().test.isLoading) { return; }

    try {
        dispatch(startApiCallAction<ActionTypes.FETCH_SECURED_DATA>(ActionTypes.FETCH_SECURED_DATA) as any);
        const apiResponseData = await ApiCallService.fetchSecuredData(secret);
        dispatch(succeededApiCallAction<ActionTypes.FETCH_SECURED_DATA, string>(ActionTypes.FETCH_SECURED_DATA, apiResponseData));
    }
    catch (error) {
        dispatch(failedApiCallAction<ActionTypes.FETCH_SECURED_DATA>(ActionTypes.FETCH_SECURED_DATA, error.message));
    }
};

// REDUCER
export const reducer: Reducer<State> = (state: State = unloadedState, incomingAction?: Action) => {
    const action = incomingAction as AcceptedAction;
    switch (action.type) {
        case ActionTypes.FETCH_SECURED_DATA:
            return action.status === ApiCallActionStatus.SUCCEEDED
                ? {
                    ...state,
                    isLoading: false,
                    response: action.payload
                }
                : {
                    ...state,
                    isLoading: action.status === ApiCallActionStatus.STARTED,
                    response: undefined,
                    errorMessage: action.error
                }
        case ActionTypes.CLEAR_SECURED_DATA:
            return {
                isLoading: false,
                response: undefined,
                errorMessage: undefined
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state;
};