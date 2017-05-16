import {login, userInfo, logout} from '../services/app';
import { parse } from 'qs';

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: false,
    users: {
      name: 'aaa'
    },
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('618SiderFold') === 'true',
    darkTheme: localStorage.getItem('618DarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({type: 'queryUser'});
      window.onresize = function () {
        dispatch({type: 'changeNavbar'});
      };
    },
  },
  effects: {
  	*login ({ payload }, {call, put}){
      yield put({type: 'showLoginButtonLoading'});
      const data = yield call(login, parse(payload));
      if (data.success) {
      	yield put({
      		type: 'loginSuccess',
      		payload: {
      			user: {
      				name: payload.username
      			}
      		}
      	});
      } else {
      	yield put({
      		type: 'loginFail'
      	});
      }
    },
    *queryUser ({ payload }, {call, put}) {
    	yield put({type: 'showLoading'});
    	const data = yield call(userInfo, parse(payload));
    	if(data.success) {
    		yield put({
    			type: 'loginSuccess',
    			payload: {
    				user: {
    					name: data.username
    				}
    			}
    		});
    	}

    	yield put({type: 'hideLoading'});
    },
    *logout ({ payload }, {call, put}){
    	const data = yield call(logout, parse(payload));
        if (data.success) {
          yield put({
            type: 'logoutSuccess'
          });
        }
    },
    *switchSider ({ payload }, {put}){
    	yield put({
    		type: 'handleSwitchSider'
    	});
    },
    *changeTheme ({ payload }, {put}) {
    	yield put({
    		type: 'handleChangeTheme'
    	});
    },
    *changeNavbar ({ payload }, {put}) {
    	if(document.body.clientWidth < 769) {
    		yield put({type: 'showNavbar'});
    	} else {
    		yield put({type: 'hideNavbar'});
    	}
    },
    *switchMenuPopover ({ payload }, {put}) {
    	yield put({
    		type: 'handleSwitchMenuPopver'
    	});
    }
  },
  reducers: {
  	loginSuccess (state, action) {
  		return {
  			...state,
  			...action.payload,
  			login: true,
  			loginButtonLoading: false
  		};
  	},
  	logoutSuccess (state) {
  		return {
  			...state,
  			login: false
  		};
  	},
  	loginFail (state) {
  		return {
  			...state,
  			login: false,
  			loginButtonLoading: false
  		};
  	},
  	showLoginButtonLoading (state) {
  		return {
  			...state,
  			loginButtonLoading: true
  		};
  	},
  	showLoading (state) {
  		return {
  			...state,
  			loading: true
  		}
  	},
  	hideLoading (state) {
  		return {
  			...state,
  			loading: false
  		}
  	},
  	handleSwitchSider (state) {
  		localStorage.setItem('618SiderFold', !state.siderFold);
  		return {
  			...state,
  			siderFold: !state.siderFold
  		};
  	},
  	handleChangeTheme (state) {
  		localStorage.setItem('618DarkTheme', !state.darkTheme);
  		return {
  			...state,
  			darkTheme: !state.darkTheme
  		};
  	},
  	showNavbar (state) {
  		return {
  			...state,
  			isNavbar: true
  		};
  	},
  	hideNavbar (state) {
  		return {
  			...state,
  			isNavbar: false
  		};
  	},
    handleSwitchMenuPopver (state) {
    	return {
    		...state,
    		menuPopoverVisible: !state.menuPopoverVisible
    	};
    },
  },
};
