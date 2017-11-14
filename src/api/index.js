import { get } from './api'

export const AxiosIndexTopic = (tab, page, limit) =>{
  let path = 'topics'
  let query = `?tab=${tab}&page=${page}&limit=${limit}`
  return get(path,query)
}

export const AxiosTopicContent = (topic_id) =>{
  let path = `topic/${topic_id}`
  return get(path)
}

export const AxiosUserLoginname = (loginname) =>{
  let path = `user/${loginname}`;
  return get(path)
}
