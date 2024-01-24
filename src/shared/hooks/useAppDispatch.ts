import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/Store';

export const useAppDispatch: () => AppDispatch = useDispatch;
