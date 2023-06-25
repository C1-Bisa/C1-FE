export const reformatDuration = (duration) => {
    let text = String(duration)
        .split('')
        .filter((txt) => txt !== '9');

    return `${text[0]}h ${text[1]}m`;
};
