import { get } from './api'

export const AxiosIndexTopic = (tab) =>{
  let path = 'topics'
  let query = `?tab=${tab}`
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
