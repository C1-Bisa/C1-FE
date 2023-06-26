export const reformatDuration = (duration) => {
    let text = String(duration)
        .split('')
        .filter((txt) => txt !== '9');

    if (text.length === 2) {
        return `${text[0]}h ${text[1]}m`;
    }

    if (text[1] === '0') {
        return `${text[0]}h ${text[2]}m`;
    }
    return `${text[0]}h ${text[1]}${text[2]}m`;
};
