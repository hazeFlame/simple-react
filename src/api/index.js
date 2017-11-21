import {
  get,
  post
} from './api'

export const AxiosIndexTopic = (tab, page, limit) => {
  let path = 'topics'
  let query = `?tab=${tab}&page=${page}&limit=${limit}`
  return get(path, query)
}

export const AxiosTopicContent = (topic_id) => {
  let path = `topic/${topic_id}`
  return get(path)
}

export const AxiosUserLoginname = (loginname) => {
  let path = `user/${loginname}`;
  return get(path)
}

export const AxiosLogin = (data) => {
  let path = 'accesstoken'
  return post(path, data)
}

export const AxiosCreateTopic = (data) => {
  let path = 'topics'
  return post(path, data)
}