import React from 'react';

class Records extends React.Component {
  render () {
    return (
      <div>
        <h2>Records</h2>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2018-01-09</td>
              <td>收入</td>
              <td>20</td>
            </tr>
            <tr>
              <td>2018-02-09</td>
              <td>收入</td>
              <td>20</td>
            </tr>
            <tr>
              <td>2018-03-09</td>
              <td>收入</td>
              <td>20</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Records;
