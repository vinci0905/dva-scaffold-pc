import React from 'react';
import { Menu, Icon, Popover } from 'antd';
import styles from './main.less';
import Menus from './Menus';

const SubMenu = Menu.SubMenu;

function Header ({user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover}) {
	let handleClickMenu = e => e.key === 'logout' && logout();
	const menusProps = {
		siderFold: false,
		darkTheme: false,
		isNavbar,
		location
	};
	return (
		<div className={styles.header}>
			{isNavbar ? 
				<Popover placement='bottomLeft' onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} triger='click' content={<Menus {...menusProps} />}>
					<div className={styles.siderbutton}>
						<Icon type='bars' />
					</div>
				</Popover>
				:
				<div className={styles.siderbutton} onClick={switchSider}>
					<Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
				</div>
				 }
			
			<Menu mode='horizontal' className='headermenu' onClick={handleClickMenu}>
				<Menu.Item key='index'>
					<a><Icon type="home" />首页</a>
				</Menu.Item>
				<Menu.Item key='member'>
					<a><Icon type="user" />会员中心</a>
				</Menu.Item>
				<SubMenu title={<span><Icon type='poweroff'/>{user.name}</span>}>
					<Menu.Item key='switch'>
						<a>切换账号</a>
					</Menu.Item>
					<Menu.Item key='logout'>
						<a>退出</a>
					</Menu.Item>
				</SubMenu>
				<SubMenu title={<span><Icon type='tablet'/>运输管理系统</span>}>
					<Menu.Item key='express'>
						<a>运输管理系统</a>
					</Menu.Item>
					<Menu.Item key='order'>
						<a>订单系统</a>
					</Menu.Item>
				</SubMenu>
				<Menu.Item key='system'>
					<a><Icon type="setting" />系统管理</a>
				</Menu.Item>
			</Menu>
			
		</div>
	);
}

export default Header;


