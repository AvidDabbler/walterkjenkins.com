export const cors = (url) => {
    return 'https://mysterious-cove-5444667116.herokuapp.com/' + url + new Date().valueOf();
}
export const cors_noDate = (url) => {
    return 'https://mysterious-cove-5444667116.herokuapp.com/' + url;
}