import request from '../utils/request';

export async function query (params) {
  return request('/api/orders', {
    method: 'post',
    data: params
  })
}

export async function create (params) {
  return request('/api/orders', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request('/api/orders', {
    method: 'delete',
    data: params
  })
}

export async function update (params) {
  return request('/api/orders', {
    method: 'put',
    data: params
  })
}