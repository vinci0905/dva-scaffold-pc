import * as usersService from '../services/users';
import { parse } from 'qs';

export default {
  namespace: 'users',
  state: {
  	list: [],
    loading: false
  },
  reducers: {
    showLoading(state, action) {
      return { ...state, loading: true }
    },
  	fetchSuccess(state, action) {
  		return { ...state, ...action.payload };
  	}
  },
  effects: {
  	*fetch({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
  		const data = yield call(usersService.fetch, parse(payload));
      if (data && data.success) {
        yield put({ 
          type: 'fetchSuccess', 
          payload: {
            list: data.list
          } 
        });
      }
  		
  	},
  },
  subscriptions: {
  	setup({ dispatch, history }) {
  		return history.listen(({ pathname, query }) => {
  			if(pathname === '/users') {
  				dispatch({ type: 'fetch', payload: query });
  			}
  		});
  	},
  },
};
