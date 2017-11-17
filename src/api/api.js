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

export const post = (path, datas, query) => {
    let url;
    if (query) {
        url = `${api}/${path}?${query}`;
    } else {
        url = `${api}/${path}`;
    }

    return axios({
        method: 'post',
        url: url,
        data: datas
    })
        .then(res => res.data)
        .catch(err => window.console.error(err));
};