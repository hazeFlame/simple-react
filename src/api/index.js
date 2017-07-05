import axios from 'axios'

const api = 'https://cnodejs.org/api/v1';

const get = (path,query) =>{
  let url;
  if (query) {
    url = `${api}/${path}/${query}`;
  }else{
    url = `${api}/${path}`;
  }

  return axios(url)
  .then(res => res.data)
  .catch(err => window.console.error(err))
}


export const AxiosIndexTopic = () =>{
  let path = 'topics'
  return get(path)
}

export const AxiosTopicContent = (topic_id) =>{
  let path = `topic/${topic_id}`
  return get(path)
}

export const AxiosUserLoginname = (loginname) =>{
  let path = `user/${loginname}`;
  return get(path)
}
