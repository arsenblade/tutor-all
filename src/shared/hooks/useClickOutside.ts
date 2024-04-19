import useEventListener from './useEventListener';
import {MutableRefObject} from 'react';

export default function useClickOutside(
    ref: MutableRefObject<any>,
    cb: (event: Event) => void,
) {
    useEventListener('click', (e: Event) => {
        if (ref.current == null || ref.current.contains(e.target as Node)) return;
        cb(e);
    });
}
