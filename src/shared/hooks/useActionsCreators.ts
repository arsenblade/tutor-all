import {
    ActionCreatorsMapObject, AsyncThunk, bindActionCreators,
} from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useAppDispatch } from './useAppDispatch';
import type {Dispatch} from 'redux';
import {AxiosError} from 'axios';

type AsyncThunkConfig = {
    state?: unknown
    dispatch?: Dispatch
    extra?: unknown
    rejectValue: AxiosError
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
}

export const useActionCreatorsTyped = <
    Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject
>(
    actions: Actions,
): BoundActions<Actions> => {
    const dispatch = useAppDispatch();

    return useMemo(() => bindActionCreators(actions, dispatch), []);
};

type BoundActions<Actions extends ActionCreatorsMapObject> = {
    [key in keyof Actions]: Actions[key]extends AsyncThunk<any, any, AsyncThunkConfig>
        ? BoundAsyncThunk<Actions[key]>
        : Actions[key]
}

type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, AsyncThunkConfig>> = (
    ...args: Parameters<Thunk>
) => ReturnType<ReturnType<Thunk>>
