import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from ".";

// shortcut for thunk  action typings
export type TypedThunkAction<A extends Action<any>> = ThunkAction<Promise<void>, ApplicationState, void, A>;

export enum ApiCallActionStatus {
    DEFAULT = "DEFAULT",
    STARTED = "STARTED",
    SUCCEEDED = "SUCCEEDED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED"
} 

// defines API call Action interface
export interface ApiCallAction<T, P> extends Action<T>{
    status: ApiCallActionStatus,
    payload: P,
    error?: string
}

// type for action creator for API call functions
type CreatorFunctionType = <T>(type: T) => ActionCreator<ApiCallAction<T, any>>;
type CreatorFunctionTypePayload = <T, P>(type: T, payload: P) => ActionCreator<ApiCallAction<T, P>>;
type CreatorFunctionTypeError = <T>(type: T, error: Error) => ActionCreator<ApiCallAction<T, any>>;

export const createStartApiCallAction: CreatorFunctionType = (type) => startApiCallAction;
export function startApiCallAction<T>(type: T): ApiCallAction<T, any> {
    return {
        type: type,
        status: ApiCallActionStatus.STARTED
    } as ApiCallAction<T, any>;
}

export const createSucceededApiCallAction: CreatorFunctionTypePayload = (type, payload) => succeededApiCallAction;
export function succeededApiCallAction<T, P>(type: T, payload: P): ApiCallAction<T, P> {
    return {
        type: type,
        payload: payload,
        status: ApiCallActionStatus.SUCCEEDED
    } as ApiCallAction<T, P>;
}

export const createFailedApiCallAction: CreatorFunctionTypeError = (type, error) => failedApiCallAction;
export function failedApiCallAction<T>(type: T, error: string): ApiCallAction<T, any> {
    return {
        type: type,
        error: error,
        status: ApiCallActionStatus.FAILED
    } as ApiCallAction<T, any>;
}

export const createCancelApiCallAction: CreatorFunctionType = (type) => cancelApiCallAction;
export function cancelApiCallAction<T>(type: T): ApiCallAction<T, any> {
    return {
        type: type,
        status: ApiCallActionStatus.CANCELLED
    } as ApiCallAction<T, any>;
}