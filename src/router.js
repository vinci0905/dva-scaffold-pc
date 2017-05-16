import React from 'react';
import { Router } from 'dva/router';
import App from './routes/App';

import Orders from "./routes/Orders.js";

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          
          //registerModel(app, require('./models/users'));

          cb(null, {component: require('./routes/Index')});
        });
      },
      childRoutes: [
        {
          path: 'users',
          name: 'users',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/users'));
              cb(null, require('./routes/Users'));
            });
          },
        },
        {
          path: 'orders',
          name: 'orders',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/orders'));
              cb(null, require('./routes/Orders'));
            });
          },
        },
      ],
    },
    
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;