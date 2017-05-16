import { create, remove, update, query } from '../services/orders';
import { parse } from 'qs';

const param = {};

export default {
  namespace: 'orders',
  state: {
    /*table state*/
    list: [],
    loading: false,
    pagination: {
      current: 1,
      total: null
    },
    /*modal state*/
    currentItem: {},
    modalVisible: false,
    modalType: 'create'
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/orders') {
          dispatch({
            type: 'query',
            payload: {
              shippingOrderQuery: {
                pageSize: 10, 
                skipCount: 0, 
                order: "desc"
              }
            }
          })
        }
      })
    },
  },
  effects: {
    *query ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
        const data = yield call(query, payload);
        
      if (data && data.success) {
        yield put({ 
          type: 'querySuccess', 
          payload: {
            list: data.data,
            pagination: {
              total: data.totalCount
            }
          }
        });
      } 
    },
    *delete ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const data = yield call(remove, { id: payload });
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.totalCount
            }
          }
        });
      }
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const data = yield call(create, payload);
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.totalCount
            }
          }
        });
      }
    },
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
      const id = yield select(({ orders }) => orders.currentItem.id)
      const newOrder = { ...payload, id }
      const data = yield call(update, newOrder)
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.totalCount
            }
          }
        })
      }
    }
  },
  reducers: {
    showLoading (state) {
      return { ...state, loading: true }
    },
    querySuccess (state, action) {
      return { ...state, ...action.payload, loading: false }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    }
  },
};
