'use client';
import { Fragment } from 'react';

export const extractWord = (words) => {
    const text = words
        .split(/((?:\w+ ){3})/g)
        .filter(Boolean)
        .join('\n');
    const lines = text.split(/\n/);

    const withBreaks = lines.flatMap((line, index) =>
        index > 0 ? [<br key={`br-${index}`} />, <Fragment key={index}>{line}</Fragment>] : [line]
    );
    return withBreaks;
};
