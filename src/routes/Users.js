import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import UsersComponent from '../components/Users/Users';



function Users({ location }) {
	
  return (
    
              <UsersComponent />
            
  );
}


export default connect()(Users);
