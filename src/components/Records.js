import React from 'react';

// import $ from 'jquery';
/**按需导入 */
// import { getJSON } from 'jquery';

import * as RecordsAPI from '../utils/RecordsAPI';

import Record from './Record';
import RecordForm from './RecordForm';
import AmountBox from './AmountBox'

class Records extends React.Component {
  constructor () {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: []
    }
  }

  /** 组件挂载之后发送请求 */
  componentDidMount () {
    /** jquery */
    // $.getJSON("http://localhost:3004/records").then(
    //   response => this.setState({
    //     records: response,
    //     isLoaded: true
    //   }),
    //   error => this.setState({
    //     isLoaded: true,
    //     error
    //   })
    // )

    /** axios */
    // axios.get("http://localhost:3004/records").then(
    RecordsAPI.getAll().then(
      response => this.setState({
        isLoaded: true,
        records: response.data
      })
    ).catch(
      error => this.setState({
        isLoaded: true,
        error
      })
    )

  }

  /** 添加record */
  addRecord (record) {
    this.setState({
      error: null,
      isLoaded: true,
      records: [
        ...this.state.records,
        record
      ]
    })
  }

  /** 更新record */
  updateRecord (record, data) {
    const recordIndex = this.state.records.indexOf(record)
    const newRecords = this.state.records.map((item, index) => {
      if (index !== recordIndex) {
        return item
      }
      return {
        ...item,
        ...data
      }
    })
    this.setState({
      records: newRecords
    })
  }

  /** 删除record */
  deleteRecord (record) {
    const recordIndex = this.state.records.indexOf(record)
    const newRecords = this.state.records.filter((item, index) => index !== recordIndex )
    this.setState({
      records: newRecords
    })
  }

  /** 所有正数相加 */
  credits () {
    /** 找出所有正数 */
    let credits = this.state.records.filter((record) => {
      return record.amount >= 0
    })
    /** 所有正数相加 */
    return credits.reduce((prev, curr) => {
      console.log(prev, curr, '相加的reduce')
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  debits () {
    /** 找出所有负数 */
    let credits = this.state.records.filter((record) => {
      return record.amount < 0
    })
    /** 所有负数相加 */
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  balance () {
    return this.credits() + this.debits()
  }

  render () {
    const { error, isLoaded, records } = this.state
    let recordsComponent;
    if (error) {
      recordsComponent = <div>Error: { error.message }</div>
    } else if (!isLoaded) {
      recordsComponent = <div>Loading...</div>
    } else {
      recordsComponent = (
        <div>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, i) => 
                <Record
                  key={record.id}
                  record={record}
                  handleEditRecord={this.updateRecord.bind(this)}
                  handleDeleteRecord={this.deleteRecord.bind(this)}
                />
              )}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div>
        <h2>Records</h2>
        <div className='row mb-3'>
          <AmountBox text='Credit' type='success' amount={this.credits()} />
          <AmountBox text='Debit' type='danger' amount={this.debits()} />
          <AmountBox text='Balance' type='info' amount={this.balance()} />
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {recordsComponent}
      </div>
    )
  }
}

export default Records;
