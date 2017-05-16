import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Login from './Login';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Sider from '../components/Layout/Sider';
import styles from '../components/Layout/main.less';
import { Spin } from 'antd';
import classnames from 'classnames';
import '../components/Layout/common.less';

function App({children, location, dispatch, app}) {
	const {login, loading, loginButtonLoading, user, siderFold, darkTheme, isNavbar, menuPopoverVisible} = app;
	const loginProps = {
		loading,
		loginButtonLoading,
		onOk (data) {
			dispatch({type: 'app/login', payload: data});
		}
	};

	const headerProps = {
		user,
		siderFold,
		location,
		isNavbar,
		menuPopoverVisible,
		switchMenuPopover () {
			dispatch({type: 'app/switchMenuPopover'});
		},
		logout () {
			dispatch({type: 'app/logout'});
		},
		switchSider () {
			dispatch({type: 'app/switchSider'});
		}
	};

	const siderProps = {
		siderFold,
		darkTheme,
		changeTheme () {
			dispatch({type: 'app/changeTheme'});
		}
	};

	return (
		<div>{login
        ? <div className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : siderFold}, {[styles.withnavbar]: isNavbar})}>
          {!isNavbar ? <aside className={classnames(styles.sider, {[styles.light]: !darkTheme})}>
            <Sider {...siderProps} />
          </aside> : ''}
          <div className={styles.main}>
            <Header {...headerProps} />
            
            <div className={styles.container}>
              <div className={styles.content}>
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </div>
        : <div className={styles.spin}><Spin tip='加载用户信息...' spinning={loading} size='large'><Login {...loginProps} /></Spin></div>}</div>
	);
}

App.propTypes = {
	children: PropTypes.element.isRequired,
	location: PropTypes.object,
	dispatch: PropTypes.func,
	loading: PropTypes.object,
	loginButtonLoading: PropTypes.bool,
	login: PropTypes.bool,
	user: PropTypes.object,
	siderFold: PropTypes.bool,
	darkTheme: PropTypes.bool
};

export default connect(({app}) => ({app}))(App);
