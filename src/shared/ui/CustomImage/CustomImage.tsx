import {HTMLProps, ReactElement, useEffect, useState} from 'react';

type ImgProps = HTMLProps<HTMLImageElement> & {
    fallback: ReactElement
}

export function CustomImage(props: ImgProps) {
    const { fallback = null, src } = props;

    const [isBroken, setIsBroken] = useState(false);

    useEffect(() => {
        setIsBroken(false);
    }, [src]);

    function handleError() {
        setIsBroken(true);
    }

    if (isBroken) {
        return fallback;
    }

    return <img onError={handleError} {...props} />;
}
