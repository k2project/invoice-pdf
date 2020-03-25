export const displayCompanyName = (name, acronym, show, max) => {
    return acronym && show ? acronym : shortenString(name, max);
};
export const shortenString = (str, max = 25) => {
    if (str.length > max) {
        return str.slice(0, max) + '...';
    }
    return str;
};
export const getFirstName = name => {
    return name ? name.split(' ')[0] : null;
};
