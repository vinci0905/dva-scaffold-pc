import React from 'react';
import { connect } from 'dva';
import styles from './Index.less';

function IndexPage() {
  return (
    <div className={styles.portal}>
      <div className={styles.bac_line}>
        <ul className={styles.m_row_first}>
          <li><a className={styles.u_img_a}><span>订单</span></a></li>
        </ul>
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
