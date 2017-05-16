import React from 'react';
import { Icon, Switch } from 'antd';
import styles from './main.less';
import Menus from './Menus';
import config from '../../config/config';
import logo from '../../assets/logo.png';

function Sider ({ siderFold, darkTheme, location, changeTheme }) {
	const menusProps = {
		siderFold,
		darkTheme,
		location
	};
	return (
		<div>
			<div className={styles.logo}>
				<img src={logo} />
			</div>
			<Menus {...menusProps} />
			{!siderFold ? 
				<div className={styles.switchtheme}>
					<span><Icon type='bulb' />切换主题</span>
					<Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren='黑' unCheckedChildren='白' />
				</div>
				: ''}
		</div>
	);
}

export default Sider;
