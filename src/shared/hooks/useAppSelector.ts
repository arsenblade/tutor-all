import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { TypeRootState } from 'app/Store';

export const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector;
