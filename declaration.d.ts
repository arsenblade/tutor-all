declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.svg' {
    import React = require('react');

    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare const __IS_DEV__: boolean;
