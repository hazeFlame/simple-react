import axios from 'axios'

axios.defaults.baseURL = 'https://cnodejs.org/api/v1';
export const get = (path, query) => {
    let url;
    if (query) {
        url = `${path}/${query}`;
    } else {
        url = `${path}`;
    }

    return axios(url)
        .then(res => res.data)
        .catch(err => window.console.error(err))
}

export const post = (path, datas, query) => {
    let url;
    if (query) {
        url = `${path}?${query}`;
    } else {
        url = `${path}`;
    }

    return axios({
        method: 'post',
        url: url,
        data: datas,
        // transformRequest: [function (data) {
        //     return data;
        // }],
    })
        .then(res => res.data)
        .catch(err => window.console.error(err));
};