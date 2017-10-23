import axios from 'axios'

const api = 'https://cnodejs.org/api/v1';

export const get = (path, query) => {
    let url;
    if (query) {
        url = `${api}/${path}/${query}`;
    } else {
        url = `${api}/${path}`;
    }

    return axios(url)
        .then(res => res.data)
        .catch(err => window.console.error(err))
}