import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva';
import OrdersList from '../components/Orders/List';
import OrdersModel from '../components/Orders/Modal';
import OrdersSearch from '../components/Orders/Search'
import styles from './Orders.css';

function Orders({ location, dispatch, orders }) {
  const { loading, list, pagination, currentItem, modalVisible, modalType } = orders;
  const { field, keyword } = location.query;

  const orderModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
        dispatch({
            type: `orders/${modalType}`,
            payload: data
        });
    },
    onCancel () {
        dispatch({
            type: 'orders/hideModal'
        });
    }
  };

  const orderListProps = {
    dataSource: list,
    loading,
    pagination: pagination,
    onPageChange (pagination, filters, sorter) {
        var skipCount = (pagination.current - 1)*pagination.pageSize;
        dispatch({
          type: 'orders/query',
          payload: {
            shippingOrderQuery: {
              pageSize: pagination.pageSize, 
              skipCount: skipCount, 
              order: sorter.order,
              orderBy: sorter.field,
              ...filters,
            }
          }  
        });
    },
    onDeleteItem (id) {
        dispatch({
            type: 'orders/delete',
            payload: id
        });
    },
    onEditItem (item) {
        dispatch({
            type: 'orders/showModal',
            payload: {
                modalType: 'update',
                currentItem: item
            }
        });
    }
  };

  const orderSearchProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
      dispatch({
        type: 'orders/query',
        payload: fieldsValue
      });
    },
    onAdd () {
      dispatch({
        type: 'orders/showModal',
        payload: {
          modalType: 'create'
        }
      });
    }
  };

  return (
    <div className={styles.normal}>
      <OrdersSearch {...orderSearchProps} />
      <OrdersList {...orderListProps} />
      <OrdersModel {...orderModalProps} />
    </div>
  );
}

Orders.propTypes = {
  orders: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({ orders }) {
  return { orders };
}

export default connect(mapStateToProps)(Orders);
