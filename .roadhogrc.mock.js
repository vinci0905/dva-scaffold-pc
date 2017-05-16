const Cookie = require('js-cookie');
const orders = require('./data/orders');
const users = require('./data/users');

let dataKey = [
  {
    username: 'guest',
    password: 'guest'
  },
  {
    username: '吴彦祖',
    password: '123456'
  }
];
  
export default {
  'POST /api/users'(req, res) {
    res.json(users); 
  },
  'POST /api/orders'(req, res) {
    res.json(orders); 
  },
  'POST /api/login' (req, res) {
    const userItem = req.body;
    const response = {
      success: false,
      message: ''
    };
    
    response.message = '登录成功';
    response.success = true;
    res.json(response);
  },

  'GET /api/userInfo' (req, res) {
    const response = {
      success: Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime(),
      username: Cookie.get('user_name') || '',
      message: ''
    }
    res.json(response)
  },

  'POST /api/logout' (req, res) {
    Cookie.remove('user_session', { path: '' })
    Cookie.remove('user_name', { path: '' })
    res.json({
      success: true,
      message: '退出成功'
    })
  },
};