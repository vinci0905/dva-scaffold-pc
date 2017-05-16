import request from '../utils/request';

export async function fetch(params) {
  return request('/api/users', {
  	method: 'post',
  	data: {aaa:'a'}
  });
}
