import React from 'react';
import '../css/table.css'

function Table(props) {
  return (
    <table className="my-table">
      <thead>
        <tr>
          <th>Coffee</th>
          <th>Creamer</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{parseInt(props.coffee)/20} tbs</td>
          <td>{parseInt(props.creamer)/20} tbs</td>
          <td>{props.time}</td>
          <td>
            <span className={`status ${props.status.toLowerCase()}`}>{props.status}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;