import React, { PropTypes, Component } from 'react'
import { Table, Input, Button, Popconfirm } from 'antd'
import styles from './List.less'

class List extends Component {
    constructor(){
        super();
        this.state = {
            searchVisible: false,
            searchText: '',
            selectedRowKeys: []
        };
        
    }

    onRowClick(record, index){
        //alert(record.id);
        let { selectedRowKeys } = this.state;
        if(selectedRowKeys.indexOf(record.id) == -1){
            this.setState({
                selectedRowKeys: [record.id, ...selectedRowKeys]
            });
        }else {
            let rowKeys = selectedRowKeys.filter(function(item) { 
                return item != record.id; 
            });
            this.setState({
                selectedRowKeys: rowKeys
            });
        }
        
    }
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    }
    onRowDoubleClick(record, index){
        this.props.onEditItem(record);
    }

    onInputChange(e) {
        this.setState({ searchText: e.target.value });
    }
    onSearch() {
        const { searchText } = this.state;
    }


    render(){
        const columns = [
            {
              title: '订单状态',
              dataIndex: 'status',
              key: 'status',
              width: 250,
              sorter: true,
            }, {
              title: '订单号',
              dataIndex: 'requestOrderNo',
              key: 'requestOrderNo',
              width: 350
            }, {
              title: (
                <div>货品名称
                <Input
                    placeholder="Search"
                    value={this.state.searchText}
                    size="small"
                    onChange={this.onInputChange.bind(this)}
                    onPressEnter={this.onSearch.bind(this)}
                  />
                </div>
              ),
              dataIndex: 'goodsName',
              key: 'goodsName',
              width: 250
            }, {
              title: '数量',
              dataIndex: 'goodsNumber',
              key: 'goodsNumber',
              width: 250
            }, {
              title: '发货地区',
              dataIndex: 'fromProvince',
              key: 'fromProvince',
              width: 250
            }, {
              title: '发货地址',
              dataIndex: 'fromAddress',
              key: 'fromAddress',
              width: 250
            }, {
              title: '收货地区',
              dataIndex: 'toProvince',
              key: 'toProvince',
              width: 250
            }, {
              title: '收货地址',
              dataIndex: 'toAddress',
              key: 'toAddress',
              width: 250
            }, {
              title: '发货人',
              dataIndex: 'senderName',
              key: 'senderName',
              width: 250
            }, {
              title: '发货联系电话',
              dataIndex: 'senderMobile',
              key: 'senderMobile',
              width: 250
            }, {
              title: '收货人',
              dataIndex: 'receiverPartyName',
              key: 'receiverPartyName',
              width: 250
            }, {
              title: '收货联系电话',
              dataIndex: 'receiverMobile',
              key: 'receiverMobile',
              width: 250
            }, {
              title: '接货方式',
              dataIndex: 'deliveryMethod',
              key: 'deliveryMethod',
              width: 250
            }, {
              title: '送货方式',
              dataIndex: 'transportMethod',
              key: 'transportMethod',
              width: 250
            }, {
              title: '代收货款',
              dataIndex: 'isInsteadFee',
              key: 'isInsteadFee',
              width: 250
            }, {
              title: '回单要求',
              dataIndex: 'receiptMethod',
              key: 'receiptMethod',
              width: 250
            }, {
              title: '结算方式',
              dataIndex: 'payMethod',
              key: 'payMethod',
              width: 250
            }, {
              title: '下单时间',
              dataIndex: 'datecreated',
              key: 'datecreated',
              width: 250
            }, {
              title: '备注',
              dataIndex: 'consignorMemo',
              key: 'consignorMemo',
              width: 250
            }
          ];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange.bind(this),
        };
        return (
            <div>
              <Table
                className={styles.table}
                rowSelection={rowSelection}
                bordered
                columns={columns}
                dataSource={this.props.dataSource}
                loading={this.props.loading}
                onChange={this.props.onPageChange}
                onRowClick={this.onRowClick.bind(this)}
                onRowDoubleClick={this.onRowDoubleClick.bind(this)}
                pagination={this.props.pagination}
                simple
                rowKey={record => record.id}
                scroll={{ y: 540, x: 2200 }}
              />
            </div>
        )
    }
}



List.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  pagination: PropTypes.any
}

export default List
