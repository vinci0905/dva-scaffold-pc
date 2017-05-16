module.exports = [
  {
    key: '',
    name: '首页',
    icon: 'home'
  },
  {
    key: 'users',
    name: '用户管理',
    icon: 'user'
  },
  {
    key: 'orders',
    name: '订单中心',
    icon: 'user'
  },
  {
    key: 'tr',
    name: '运单',
    icon: 'camera-o',
    clickable: false,
    child: [
      {
        key: 'ico',
        name: '运单列表'
      },
      {
        key: 'search',
        name: '运单搜索'
      }
    ]
  },
  {
    key: 'navigation',
    name: '导航',
    icon: 'setting',
    child: [
      {
        key: 'navigation1',
        name: '二级导航1'
      },
      {
        key: 'navigation2',
        name: '二级导航2',
        child: [
          {
            key: 'navigation21',
            name: '三级导航1'
          },
          {
            key: 'navigation22',
            name: '三级导航2'
          }
        ]
      }
    ]
  },
  {
    key: 'navigation1',
    name: '导航',
    icon: 'setting',
    child: [
      {
        key: 'navigation1',
        name: '二级导航1'
      },
      {
        key: 'navigation2',
        name: '二级导航2',
        child: [
          {
            key: 'navigation21',
            name: '三级导航1'
          },
          {
            key: 'navigation22',
            name: '三级导航2'
          }
        ]
      }
    ]
  }
];
